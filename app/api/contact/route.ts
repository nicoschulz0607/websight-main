import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ConfigItem { label: string; price: string; }
interface Config { items: ConfigItem[]; totalOnce: number; totalMo: number; estimation: string; company?: string; phone?: string; }

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clampString(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.slice(0, maxLength).trim();
}

/**
 * Validates and sanitizes the raw request payload. Returns null if the
 * payload is malformed so the caller can respond with a generic 400 —
 * this is the boundary where untrusted user input enters the system.
 */
function parsePayload(body: unknown): { name: string; email: string; message: string; config?: Config } | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;

  const name = clampString(b.name, 100);
  const email = clampString(b.email, 200);
  const message = clampString(b.message, 5000);

  if (!name || !email || !EMAIL_RE.test(email)) return null;

  let config: Config | undefined;
  if (b.config && typeof b.config === "object") {
    const c = b.config as Record<string, unknown>;
    const rawItems = Array.isArray(c.items) ? c.items.slice(0, 20) : [];
    const items: ConfigItem[] = rawItems
      .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
      .map((item) => ({
        label: clampString(item.label, 120),
        price: clampString(item.price, 60),
      }));

    config = {
      items,
      totalOnce: typeof c.totalOnce === "number" ? c.totalOnce : 0,
      totalMo: typeof c.totalMo === "number" ? c.totalMo : 0,
      estimation: clampString(c.estimation, 100),
      company: c.company ? clampString(c.company, 150) : undefined,
      phone: c.phone ? clampString(c.phone, 40) : undefined,
    };
  }

  return { name, email, message, config };
}

// Best-effort in-memory rate limit. Serverless instances are ephemeral, so
// this doesn't guarantee a hard cap across all traffic, but it stops rapid
// bursts from a single warm instance (e.g. a naive script hammering the route).
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function confirmationHtml(name: string, email: string, projekt: string, config?: Config): string {
  const F = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif`;
  const MONO = `'Courier New', Courier, monospace`;

  const configCard = config && config.items.length > 0 ? `
        <!-- SPACER -->
        <tr><td style="height:20px;background-color:#000000;font-size:0;line-height:0;">&nbsp;</td></tr>

        <!-- KONFIGURATION CARD -->
        <tr>
          <td bgcolor="#0d0d0d" class="card-bg" style="background-color:#0d0d0d;border-radius:12px;border:1px solid #1e1e1e;padding:28px 32px 20px 32px;">
            <p style="margin:0 0 18px 0;font-family:${MONO};font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:#555555;">Deine Konfiguration</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${config.items.map((item, i) => `
              <tr>
                <td style="padding:10px 0;${i < config.items.length - 1 ? "border-bottom:1px solid #1e1e1e;" : ""}font-family:${F};font-size:13px;color:#888888;">${escapeHtml(item.label)}</td>
                <td style="padding:10px 0;${i < config.items.length - 1 ? "border-bottom:1px solid #1e1e1e;" : ""}font-family:${F};font-size:13px;color:#cccccc;text-align:right;white-space:nowrap;">${escapeHtml(item.price)}</td>
              </tr>`).join("")}
            </table>
            <!-- Total -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;border-top:1px solid #2a2a2a;">
              <tr>
                <td style="padding-top:14px;font-family:${MONO};font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#555555;">Richtwert</td>
                <td style="padding-top:14px;text-align:right;">
                  <span style="font-family:${F};font-size:16px;font-weight:700;color:#8b6ff7;">${escapeHtml(config.estimation)}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>` : "";

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeProjekt = escapeHtml(projekt);
  const safeCompany = config?.company ? escapeHtml(config.company) : undefined;
  const safePhone = config?.phone ? escapeHtml(config.phone) : undefined;

  return `<!DOCTYPE html>
<html lang="de" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Websight – Anfrage erhalten</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <style type="text/css">
    /* Prevent all email clients from applying dark-mode color transformations.
       We ship a dark design intentionally — block any automatic inversion. */
    :root { color-scheme: light; supported-color-schemes: light; }
    /* Gmail dark-mode override selectors */
    [data-ogsc] body, [data-ogsb] body { background-color: #000000 !important; color: #fbfbf4 !important; }
    [data-ogsc] table, [data-ogsb] table { background-color: #000000 !important; }
    [data-ogsc] .card-bg, [data-ogsb] .card-bg { background-color: #0d0d0d !important; }
    /* Apple Mail / Outlook dark-mode override */
    @media (prefers-color-scheme: dark) {
      body { background-color: #000000 !important; color: #fbfbf4 !important; }
      .body-bg { background-color: #000000 !important; }
      .card-bg { background-color: #0d0d0d !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#000000;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;color-scheme:light;">

<!-- Outer wrapper -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#000000" class="body-bg" style="background-color:#000000;">
  <tr>
    <td align="center" style="padding:40px 16px;">

      <!-- Content table -->
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" bgcolor="#000000" style="max-width:560px;width:100%;background-color:#000000;">

        <!-- LOGO -->
        <tr>
          <td align="center" style="padding:0 0 36px 0;background-color:#000000;">
            <span style="font-family:${MONO};font-size:18px;font-weight:700;letter-spacing:0.2em;color:#fbfbf4;text-transform:uppercase;">WEBSIGHT</span>
          </td>
        </tr>

        <!-- HERO CARD -->
        <tr>
          <td bgcolor="#0d0d0d" class="card-bg" style="background-color:#0d0d0d;border-radius:16px;border:1px solid #1e1e1e;padding:48px 36px;text-align:center;">
            <!-- Badge -->
            <div style="display:inline-block;margin-bottom:24px;">
              <span style="font-family:${MONO};font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:#8b8b8b;background-color:#1a1025;border:1px solid #3a2060;border-radius:999px;padding:6px 18px;display:inline-block;">Anfrage eingegangen</span>
            </div>
            <!-- Headline -->
            <h1 style="margin:0 0 18px 0;font-family:${F};font-size:38px;font-weight:800;line-height:1.05;letter-spacing:-0.03em;color:#fbfbf4;">
              Deine Anfrage<br>
              <span style="color:#8b6ff7;">ist angekommen.</span>
            </h1>
            <!-- Sub -->
            <p style="margin:0;font-family:${F};font-size:15px;line-height:1.75;color:#888888;max-width:380px;display:inline-block;">
              Ich melde mich innerhalb von 24&nbsp;Stunden pers&ouml;nlich bei dir.
            </p>
          </td>
        </tr>

        <!-- DIVIDER -->
        <tr>
          <td style="padding:28px 0;background-color:#000000;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr><td style="height:1px;background-color:#1a1a1a;font-size:0;line-height:0;">&nbsp;</td></tr>
            </table>
          </td>
        </tr>

        <!-- DEINE ANGABEN CARD -->
        <tr>
          <td bgcolor="#0d0d0d" class="card-bg" style="background-color:#0d0d0d;border-radius:12px;border:1px solid #1e1e1e;padding:28px 32px 20px 32px;">
            <!-- Label -->
            <p style="margin:0 0 18px 0;font-family:${MONO};font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:#555555;">Deine Angaben</p>
            <!-- Rows -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;font-family:${F};font-size:13px;color:#666666;width:80px;">Name</td>
                <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;font-family:${F};font-size:13px;color:#cccccc;text-align:right;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:11px 0;${safeCompany || safePhone ? "border-bottom:1px solid #1e1e1e;" : ""}font-family:${F};font-size:13px;color:#666666;">E-Mail</td>
                <td style="padding:11px 0;${safeCompany || safePhone ? "border-bottom:1px solid #1e1e1e;" : ""}font-family:${F};font-size:13px;color:#cccccc;text-align:right;">${safeEmail}</td>
              </tr>
              ${safeCompany ? `<tr>
                <td style="padding:11px 0;${safePhone ? "border-bottom:1px solid #1e1e1e;" : ""}font-family:${F};font-size:13px;color:#666666;">Unternehmen</td>
                <td style="padding:11px 0;${safePhone ? "border-bottom:1px solid #1e1e1e;" : ""}font-family:${F};font-size:13px;color:#cccccc;text-align:right;">${safeCompany}</td>
              </tr>` : ""}
              ${safePhone ? `<tr>
                <td style="padding:11px 0 0 0;font-family:${F};font-size:13px;color:#666666;">Telefon</td>
                <td style="padding:11px 0 0 0;font-family:${F};font-size:13px;color:#cccccc;text-align:right;">${safePhone}</td>
              </tr>` : ""}
              ${!config ? `<tr>
                <td style="padding:11px 0 0 0;font-family:${F};font-size:13px;color:#666666;vertical-align:top;">Nachricht</td>
                <td style="padding:11px 0 0 0;font-family:${F};font-size:13px;color:#cccccc;text-align:right;">${safeProjekt}</td>
              </tr>` : ""}
            </table>
          </td>
        </tr>

        ${configCard}

        <!-- SPACER -->
        <tr><td style="height:20px;background-color:#000000;font-size:0;line-height:0;">&nbsp;</td></tr>

        <!-- WAS PASSIERT CARD -->
        <tr>
          <td bgcolor="#0d0d0d" class="card-bg" style="background-color:#0d0d0d;border-radius:12px;border:1px solid #1e1e1e;padding:28px 32px 20px 32px;">
            <p style="margin:0 0 18px 0;font-family:${MONO};font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:#555555;">Was passiert als n&auml;chstes</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <!-- Step 01 -->
              <tr>
                <td style="padding:0 14px 0 0;vertical-align:top;width:28px;border-bottom:1px solid #1e1e1e;padding-bottom:14px;">
                  <span style="font-family:${MONO};font-size:10px;font-weight:700;letter-spacing:0.18em;color:#60a5fa;">01</span>
                </td>
                <td style="border-bottom:1px solid #1e1e1e;padding-bottom:14px;">
                  <p style="margin:0 0 4px 0;font-family:${F};font-size:14px;font-weight:600;color:#cccccc;">Ich schaue mir deine Anfrage an</p>
                  <p style="margin:0;font-family:${F};font-size:13px;color:#666666;line-height:1.6;">Und bereite konkrete Ideen für dein Projekt vor.</p>
                </td>
              </tr>
              <!-- Spacer row -->
              <tr><td colspan="2" style="height:14px;font-size:0;line-height:0;">&nbsp;</td></tr>
              <!-- Step 02 -->
              <tr>
                <td style="padding:0 14px 0 0;vertical-align:top;width:28px;border-bottom:1px solid #1e1e1e;padding-bottom:14px;">
                  <span style="font-family:${MONO};font-size:10px;font-weight:700;letter-spacing:0.18em;color:#8b6ff7;">02</span>
                </td>
                <td style="border-bottom:1px solid #1e1e1e;padding-bottom:14px;">
                  <p style="margin:0 0 4px 0;font-family:${F};font-size:14px;font-weight:600;color:#cccccc;">Pers&ouml;nliche R&uuml;ckmeldung</p>
                  <p style="margin:0;font-family:${F};font-size:13px;color:#666666;line-height:1.6;">Du h&ouml;rst innerhalb von 24 Stunden von mir &ndash; mit einem konkreten Plan, keinem Standardangebot.</p>
                </td>
              </tr>
              <!-- Spacer row -->
              <tr><td colspan="2" style="height:14px;font-size:0;line-height:0;">&nbsp;</td></tr>
              <!-- Step 03 -->
              <tr>
                <td style="padding:0 14px 0 0;vertical-align:top;width:28px;">
                  <span style="font-family:${MONO};font-size:10px;font-weight:700;letter-spacing:0.18em;color:#ad2bee;">03</span>
                </td>
                <td>
                  <p style="margin:0 0 4px 0;font-family:${F};font-size:14px;font-weight:600;color:#cccccc;">Erstgespr&auml;ch &amp; Strategie</p>
                  <p style="margin:0;font-family:${F};font-size:13px;color:#666666;line-height:1.6;">Wir sprechen &uuml;ber deine Ziele und entwickeln gemeinsam die richtige digitale Strategie.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- DIVIDER -->
        <tr>
          <td style="padding:28px 0;background-color:#000000;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr><td style="height:1px;background-color:#1a1a1a;font-size:0;line-height:0;">&nbsp;</td></tr>
            </table>
          </td>
        </tr>

        <!-- SIGNATURE -->
        <tr>
          <td style="background-color:#000000;border-left:2px solid #3a2060;padding:20px 0 20px 24px;">
            <p style="margin:0 0 10px 0;font-family:${F};font-size:15px;font-style:italic;line-height:1.7;color:#666666;">&bdquo;Ich freue mich auf dein Projekt &ndash; lass uns was Gutes bauen.&ldquo;</p>
            <span style="font-family:${MONO};font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8b6ff7;">Nico Schulz &mdash; Websight</span>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td align="center" style="padding:32px 0 0 0;background-color:#000000;">
            <p style="margin:0;font-family:${F};font-size:12px;color:#444444;line-height:1.8;">
              <a href="mailto:nico@websight-design.de" style="color:#444444;text-decoration:none;">nico@websight-design.de</a>
              &nbsp;&middot;&nbsp;
              <a href="https://websight-design.de" style="color:#444444;text-decoration:none;">websight-design.de</a><br>
              +49 172 9249820
            </p>
          </td>
        </tr>

      </table>
      <!-- /Content table -->

    </td>
  </tr>
</table>
<!-- /Outer wrapper -->

</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Zu viele Anfragen. Bitte versuche es später erneut." }, { status: 429 });
    }

    const rawBody = await req.json().catch(() => null);
    if (!rawBody || typeof rawBody !== "object") {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }

    // Honeypot: a hidden field real users never fill in. Bots that
    // auto-fill every field will trip it — silently accept and drop.
    if (typeof (rawBody as Record<string, unknown>).website === "string" && (rawBody as Record<string, unknown>).website) {
      return NextResponse.json({ ok: true });
    }

    const parsed = parsePayload(rawBody);
    if (!parsed) {
      return NextResponse.json({ error: "Bitte gib einen gültigen Namen und eine gültige E-Mail-Adresse an." }, { status: 400 });
    }
    const { name, email, message, config } = parsed;

    // 1. Benachrichtigung an Nico
    const { data, error } = await resend.emails.send({
      from: "Websight Kontaktformular <noreply@websight-design.de>",
      to: ["nico@websight-design.de"],
      subject: `Neue Anfrage von ${name}`,
      replyTo: email,
      text: `Name: ${name}\nE-Mail: ${email}\n\nProjekt-Details:\n${message}`,
    });

    if (error) {
      console.error("[Contact] Resend error:", error);
      return NextResponse.json({ error: "Deine Anfrage konnte nicht gesendet werden. Schreib mir gerne direkt an nico@websight-design.de." }, { status: 500 });
    }

    // 2. Bestätigungsmail an den Absender — Fehler hier sind nicht fatal,
    // die Anfrage selbst ist bereits bei Nico angekommen.
    try {
      await resend.emails.send({
        from: "Websight <noreply@websight-design.de>",
        to: [email],
        subject: "Deine Anfrage bei Websight – wir haben sie erhalten",
        html: confirmationHtml(name, email, message, config),
      });
    } catch (confirmationError) {
      console.error("[Contact] Bestätigungsmail fehlgeschlagen:", confirmationError);
    }

    console.log("[Contact] E-Mails gesendet:", data?.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Unerwarteter Fehler. Bitte versuche es später erneut." },
      { status: 500 }
    );
  }
}
