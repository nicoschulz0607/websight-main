import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function confirmationHtml(name: string, email: string, projekt: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Websight – Anfrage erhalten</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #000000; font-family: 'Geist', system-ui, sans-serif; color: #fbfbf4; -webkit-font-smoothing: antialiased; }
    .wrapper { max-width: 600px; margin: 0 auto; padding: 40px 24px; }
    .header { text-align: center; padding: 0 0 44px; }
    .header img { height: 36px; width: auto; }
    .hero { background: #080808; border: 1px solid rgba(251,251,244,0.06); border-radius: 16px; padding: 52px 40px; text-align: center; position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; top: -80px; left: -10%; width: 45%; height: 45%; border-radius: 50%; background: radial-gradient(circle, rgba(96,165,250,0.07), transparent 70%); pointer-events: none; }
    .hero::after { content: ''; position: absolute; bottom: -80px; right: -10%; width: 45%; height: 45%; border-radius: 50%; background: radial-gradient(circle, rgba(173,43,238,0.07), transparent 70%); pointer-events: none; }
    .hero-badge { display: inline-block; background: rgba(139,111,247,0.08); border: 1px solid rgba(139,111,247,0.18); color: rgba(251,251,244,0.45); font-size: 0.65rem; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; font-family: monospace; padding: 6px 16px; border-radius: 9999px; margin-bottom: 28px; }
    .hero h1 { font-size: 3rem; font-weight: 800; line-height: 0.95; color: #fbfbf4; letter-spacing: -0.04em; margin-bottom: 20px; }
    .gradient-text { background: linear-gradient(90deg, #60a5fa, #ad2bee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .hero p { font-size: 1rem; line-height: 1.85; color: rgba(251,251,244,0.45); max-width: 400px; margin: 0 auto; }
    .divider { height: 1px; background: rgba(251,251,244,0.06); margin: 36px 0; }
    .card { background: #080808; border: 1px solid rgba(251,251,244,0.06); border-radius: 12px; padding: 28px 32px; margin: 0 0 24px; }
    .section-label { font-size: 0.65rem; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; font-family: monospace; color: rgba(251,251,244,0.25); margin-bottom: 20px; }
    .summary-row { display: flex; justify-content: space-between; align-items: flex-start; padding: 12px 0; border-bottom: 1px solid rgba(251,251,244,0.06); gap: 16px; }
    .summary-row:last-child { border-bottom: none; padding-bottom: 0; }
    .summary-key { font-size: 0.85rem; color: rgba(251,251,244,0.38); min-width: 80px; }
    .summary-value { font-size: 0.85rem; color: rgba(251,251,244,0.72); text-align: right; flex: 1; }
    .step { display: flex; gap: 18px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid rgba(251,251,244,0.06); }
    .step:first-of-type { padding-top: 0; }
    .step:last-child { border-bottom: none; padding-bottom: 0; }
    .step-num { font-size: 0.65rem; font-weight: 500; letter-spacing: 0.25em; font-family: monospace; min-width: 28px; padding-top: 2px; }
    .step-num.blue { color: #60a5fa; }
    .step-num.mid  { color: #8b6ff7; }
    .step-num.purp { color: #ad2bee; }
    .step h3 { font-size: 0.95rem; font-weight: 500; color: rgba(251,251,244,0.72); margin-bottom: 4px; letter-spacing: -0.01em; }
    .step p { font-size: 0.85rem; color: rgba(251,251,244,0.38); line-height: 1.7; }
    .signature { padding: 24px 32px; border-left: 1px solid rgba(139,111,247,0.3); margin: 0 0 32px; }
    .signature p { font-size: 1rem; color: rgba(251,251,244,0.45); line-height: 1.85; font-style: italic; margin-bottom: 12px; }
    .signature-name { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; background: linear-gradient(90deg, #60a5fa, #ad2bee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .footer { text-align: center; }
    .footer-meta { font-size: 0.75rem; color: rgba(251,251,244,0.25); line-height: 1.8; }
    .footer-meta a { color: rgba(251,251,244,0.25); text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <img src="https://websight-design.de/logo.png" alt="Websight" />
    </div>
    <div class="hero">
      <div class="hero-badge">Anfrage eingegangen</div>
      <h1>Dein Potenzial<br><span class="gradient-text">wird analysiert.</span></h1>
      <p>Wir haben deine Anfrage erhalten und melden uns innerhalb von 24 Stunden persönlich bei dir.</p>
    </div>
    <div class="divider"></div>
    <div class="card">
      <div class="section-label">Deine Angaben</div>
      <div class="summary-row">
        <span class="summary-key">Name</span>
        <span class="summary-value">${name}</span>
      </div>
      <div class="summary-row">
        <span class="summary-key">E-Mail</span>
        <span class="summary-value">${email}</span>
      </div>
      <div class="summary-row">
        <span class="summary-key">Projekt</span>
        <span class="summary-value">${projekt}</span>
      </div>
    </div>
    <div class="card">
      <div class="section-label">Was passiert als nächstes</div>
      <div class="step">
        <span class="step-num blue">01</span>
        <div>
          <h3>Analyse deines Projekts</h3>
          <p>Wir schauen uns deine Anfrage an und bereiten konkrete Ideen vor.</p>
        </div>
      </div>
      <div class="step">
        <span class="step-num mid">02</span>
        <div>
          <h3>Persönliche Rückmeldung</h3>
          <p>Du hörst innerhalb von 24 Stunden von uns – mit einem konkreten Plan, keinem Standardangebot.</p>
        </div>
      </div>
      <div class="step">
        <span class="step-num purp">03</span>
        <div>
          <h3>Erstgespräch &amp; Strategie</h3>
          <p>Wir sprechen über deine Ziele und entwickeln gemeinsam die richtige digitale Strategie.</p>
        </div>
      </div>
    </div>
    <div class="signature">
      <p>„Wir freuen uns auf dein Projekt – lass uns was Gutes bauen."</p>
      <div class="signature-name">Nico Schulz — Websight</div>
    </div>
    <div class="footer">
      <div class="footer-meta">
        <a href="mailto:nico@websight-design.de">nico@websight-design.de</a> · <a href="https://websight-design.de">websight-design.de</a><br>
        +49 172 9249820
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. Bestätigungsmail an den Absender
    await resend.emails.send({
      from: "Websight <noreply@websight-design.de>",
      to: [email],
      subject: "Deine Anfrage bei Websight – wir haben sie erhalten",
      html: confirmationHtml(name, email, message),
    });

    console.log("[Contact] E-Mails gesendet:", data?.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contact] Unexpected error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unbekannter Fehler" },
      { status: 500 }
    );
  }
}
