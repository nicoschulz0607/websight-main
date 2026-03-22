/**
 * scroll-record.js — Playwright Scroll Recorder
 * -----------------------------------------------
 * Records a smooth scroll through any webpage as MP4.
 * Useful for reviewing GSAP scroll animations visually.
 *
 * Usage:
 *   node scripts/scroll-record.js [url] [outputDir] [durationMs] [width] [height]
 *
 * Examples:
 *   node scripts/scroll-record.js http://localhost:3000
 *   node scripts/scroll-record.js http://localhost:3000 ./recordings 12000
 *   node scripts/scroll-record.js https://stripe.com ./recordings 10000 1440 900
 *
 * Defaults:
 *   url        = http://localhost:3000
 *   outputDir  = ./recordings
 *   durationMs = 10000  (10 seconds for full scroll)
 *   width      = 1440
 *   height     = 900
 *
 * Reusable: Copy this file + run `npm i -D @playwright/test` + `npx playwright install chromium`
 */

const { chromium } = require("@playwright/test");
const path = require("path");
const fs = require("fs");

const url        = process.argv[2] || "http://localhost:3000";
const outputDir  = process.argv[3] || "./recordings";
const duration   = parseInt(process.argv[4]) || 10000;
const vpWidth    = parseInt(process.argv[5]) || 1440;
const vpHeight   = parseInt(process.argv[6]) || 900;

async function record() {
  // Ensure output dir exists
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  console.log("\n🎬 scroll-record.js");
  console.log("───────────────────────────────");
  console.log(`  URL        : ${url}`);
  console.log(`  Output     : ${path.resolve(outputDir)}`);
  console.log(`  Duration   : ${duration}ms`);
  console.log(`  Viewport   : ${vpWidth}×${vpHeight}`);
  console.log("───────────────────────────────\n");

  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    viewport: { width: vpWidth, height: vpHeight },
    recordVideo: {
      dir: outputDir,
      size: { width: vpWidth, height: vpHeight },
    },
  });

  const page = await context.newPage();

  console.log("⏳ Loading page...");
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

  // Wait for fonts, GSAP init, images
  await page.waitForTimeout(2000);

  const totalHeight = await page.evaluate(
    () => document.body.scrollHeight - window.innerHeight
  );
  console.log(`📏 Total scrollable height: ${totalHeight}px`);
  console.log(`▶  Scrolling over ${duration}ms...\n`);

  // Smooth scroll in small steps (simulates real user scrolling)
  const steps = Math.round(duration / 16); // ~60fps
  const stepDelay = duration / steps;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Ease-in-out (smoother feel, better for scroll-trigger animations)
    const eased = t < 0.5
      ? 2 * t * t
      : 1 - Math.pow(-2 * t + 2, 2) / 2;

    await page.evaluate((y) => window.scrollTo(0, y), Math.round(eased * totalHeight));
    await page.waitForTimeout(stepDelay);

    // Progress indicator every 10%
    if (i % Math.round(steps / 10) === 0) {
      process.stdout.write(`  ${Math.round((i / steps) * 100)}% `);
    }
  }

  // Hold at bottom
  console.log("\n\n⏸  Holding at bottom (1s)...");
  await page.waitForTimeout(1000);

  // Scroll back to top
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await page.waitForTimeout(1500);

  await context.close();
  await browser.close();

  // Find the video file that was just created
  const files = fs.readdirSync(outputDir)
    .filter((f) => f.endsWith(".webm"))
    .map((f) => ({ name: f, time: fs.statSync(path.join(outputDir, f)).mtimeMs }))
    .sort((a, b) => b.time - a.time);

  const videoFile = files[0]?.name;
  console.log(`\n✅ Done!`);
  if (videoFile) {
    console.log(`📹 Video: ${path.resolve(outputDir, videoFile)}`);
  } else {
    console.log(`📁 Check: ${path.resolve(outputDir)}`);
  }
}

record().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
