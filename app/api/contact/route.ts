import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function confirmationHtml(name: string, email: string, projekt: string): string {
  const F = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif`;
  const MONO = `'Courier New', Courier, monospace`;
  return `<!DOCTYPE html>
<html lang="de" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Websight – Anfrage erhalten</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#000000;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

<!-- Outer wrapper -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#000000" style="background-color:#000000;">
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
          <td bgcolor="#0d0d0d" style="background-color:#0d0d0d;border-radius:16px;border:1px solid #1e1e1e;padding:48px 36px;text-align:center;">
            <!-- Badge -->
            <div style="display:inline-block;margin-bottom:24px;">
              <span style="font-family:${MONO};font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:#8b8b8b;background-color:#1a1025;border:1px solid #3a2060;border-radius:999px;padding:6px 18px;display:inline-block;">Anfrage eingegangen</span>
            </div>
            <!-- Headline -->
            <h1 style="margin:0 0 18px 0;font-family:${F};font-size:38px;font-weight:800;line-height:1.05;letter-spacing:-0.03em;color:#fbfbf4;">
              Dein Potenzial<br>
              <span style="color:#8b6ff7;">wird analysiert.</span>
            </h1>
            <!-- Sub -->
            <p style="margin:0;font-family:${F};font-size:15px;line-height:1.75;color:#888888;max-width:380px;display:inline-block;">
              Wir haben deine Anfrage erhalten und melden uns innerhalb von 24&nbsp;Stunden pers&ouml;nlich bei dir.
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
          <td bgcolor="#0d0d0d" style="background-color:#0d0d0d;border-radius:12px;border:1px solid #1e1e1e;padding:28px 32px 20px 32px;">
            <!-- Label -->
            <p style="margin:0 0 18px 0;font-family:${MONO};font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:#555555;">Deine Angaben</p>
            <!-- Rows -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;font-family:${F};font-size:13px;color:#666666;width:80px;">Name</td>
                <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;font-family:${F};font-size:13px;color:#cccccc;text-align:right;">${name}</td>
              </tr>
              <tr>
                <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;font-family:${F};font-size:13px;color:#666666;">E-Mail</td>
                <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;font-family:${F};font-size:13px;color:#cccccc;text-align:right;">${email}</td>
              </tr>
              <tr>
                <td style="padding:11px 0 0 0;font-family:${F};font-size:13px;color:#666666;vertical-align:top;">Projekt</td>
                <td style="padding:11px 0 0 0;font-family:${F};font-size:13px;color:#cccccc;text-align:right;">${projekt}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- SPACER -->
        <tr><td style="height:20px;background-color:#000000;font-size:0;line-height:0;">&nbsp;</td></tr>

        <!-- WAS PASSIERT CARD -->
        <tr>
          <td bgcolor="#0d0d0d" style="background-color:#0d0d0d;border-radius:12px;border:1px solid #1e1e1e;padding:28px 32px 20px 32px;">
            <p style="margin:0 0 18px 0;font-family:${MONO};font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:#555555;">Was passiert als n&auml;chstes</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <!-- Step 01 -->
              <tr>
                <td style="padding:0 14px 0 0;vertical-align:top;width:28px;border-bottom:1px solid #1e1e1e;padding-bottom:14px;">
                  <span style="font-family:${MONO};font-size:10px;font-weight:700;letter-spacing:0.18em;color:#60a5fa;">01</span>
                </td>
                <td style="border-bottom:1px solid #1e1e1e;padding-bottom:14px;">
                  <p style="margin:0 0 4px 0;font-family:${F};font-size:14px;font-weight:600;color:#cccccc;">Analyse deines Projekts</p>
                  <p style="margin:0;font-family:${F};font-size:13px;color:#666666;line-height:1.6;">Wir schauen uns deine Anfrage an und bereiten konkrete Ideen vor.</p>
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
                  <p style="margin:0;font-family:${F};font-size:13px;color:#666666;line-height:1.6;">Du h&ouml;rst innerhalb von 24 Stunden von uns &ndash; mit einem konkreten Plan, keinem Standardangebot.</p>
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
            <p style="margin:0 0 10px 0;font-family:${F};font-size:15px;font-style:italic;line-height:1.7;color:#666666;">&bdquo;Wir freuen uns auf dein Projekt &ndash; lass uns was Gutes bauen.&ldquo;</p>
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
