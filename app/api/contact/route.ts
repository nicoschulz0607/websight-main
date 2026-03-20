import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const { data, error } = await resend.emails.send({
      // onboarding@resend.dev funktioniert nur für die eigene verifizierte Adresse.
      // Sobald websight.studio in Resend verifiziert → auf noreply@websight.studio ändern.
      from: "Websight Kontaktformular <onboarding@resend.dev>",
      // TODO: Domain websight.studio / websight-design.de in Resend verifizieren,
      // dann hier auf "nico@websight-design.de" wechseln
      to: ["nico.schulz0607@gmail.com"],
      subject: `Neue Anfrage von ${name}`,
      replyTo: email,
      text: `Name: ${name}\nE-Mail: ${email}\n\nProjekt-Details:\n${message}`,
    });

    if (error) {
      console.error("[Contact] Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("[Contact] E-Mail gesendet:", data?.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contact] Unexpected error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unbekannter Fehler" },
      { status: 500 }
    );
  }
}
