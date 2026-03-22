import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AGB — Websight",
  robots: { index: false },
};

export default function AGB() {
  return (
    <div style={{
      maxWidth: "720px",
      margin: "0 auto",
      padding: "clamp(8rem, 14vw, 12rem) clamp(2rem, 6vw, 4rem) 6rem",
      color: "#fbfbf4",
    }}>
      <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(251,251,244,0.3)", marginBottom: "1rem", fontFamily: "monospace" }}>
        Rechtliches
      </p>
      <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
        Allgemeine Geschäfts&shy;bedingungen
      </h1>
      <p style={{ color: "rgba(251,251,244,0.3)", fontSize: "0.8rem", marginBottom: "3rem" }}>
        Stand: März 2026
      </p>

      <Section title="1. Geltungsbereich">
        <p>
          Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Nico Schulz / Websight (nachfolgend „Auftragnehmer") und seinen Auftraggebern (nachfolgend „Auftraggeber") über Leistungen im Bereich Webdesign, Webentwicklung, digitale Strategie, SEO und verwandte Dienstleistungen.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          Abweichende Bedingungen des Auftraggebers werden nicht anerkannt, sofern der Auftragnehmer ihrer Geltung nicht ausdrücklich schriftlich zugestimmt hat.
        </p>
      </Section>

      <Section title="2. Vertragsschluss">
        <p>
          Angebote des Auftragnehmers sind freibleibend und unverbindlich. Ein Vertrag kommt erst durch schriftliche Auftragsbestätigung (E-Mail genügt) oder durch beiderseitige Unterzeichnung eines Projektvertrags zustande.
        </p>
      </Section>

      <Section title="3. Leistungsumfang">
        <p>
          Der konkrete Leistungsumfang ergibt sich aus dem jeweiligen Angebot oder dem Projektvertrag. Änderungen oder Erweiterungen des Leistungsumfangs bedürfen der schriftlichen Vereinbarung und können zu einer Anpassung des Honorars führen.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          Im Angebot enthaltene Leistungen gelten als abgeschlossen, sobald der Auftragnehmer sie dem Auftraggeber zur Abnahme bereitstellt. Äußert der Auftraggeber nicht innerhalb von 10 Werktagen begründete Einwände, gilt die Leistung als abgenommen.
        </p>
      </Section>

      <Section title="4. Mitwirkungspflichten des Auftraggebers">
        <p>
          Der Auftraggeber verpflichtet sich, dem Auftragnehmer alle für die Leistungserbringung erforderlichen Unterlagen, Inhalte, Zugangsdaten und Informationen rechtzeitig und vollständig zur Verfügung zu stellen. Verzögerungen durch verspätete oder unvollständige Zulieferungen gehen nicht zu Lasten des Auftragnehmers.
        </p>
      </Section>

      <Section title="5. Korrekturrunden">
        <p>
          Im Preis sind bis zu zwei Korrekturschleifen pro Leistungspaket enthalten, sofern im Angebot nichts anderes vereinbart ist. Weitere Korrekturen werden nach Aufwand zum vereinbarten Stundensatz berechnet.
        </p>
      </Section>

      <Section title="6. Vergütung und Zahlung">
        <p>
          Die Vergütung richtet sich nach dem vereinbarten Angebot. Sofern nicht anders vereinbart, sind folgende Zahlungsbedingungen maßgeblich:
        </p>
        <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <li>50 % des Gesamthonorars sind bei Auftragserteilung fällig.</li>
          <li>50 % sind bei Projektabschluss / Abnahme fällig.</li>
        </ul>
        <p style={{ marginTop: "0.75rem" }}>
          Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug zu begleichen. Bei Zahlungsverzug behält sich der Auftragnehmer vor, die Arbeit bis zum Ausgleich der offenen Beträge zu unterbrechen.
        </p>
      </Section>

      <Section title="7. Nutzungsrechte und Urheberrecht">
        <p>
          Mit vollständiger Bezahlung des vereinbarten Honorars überträgt der Auftragnehmer dem Auftraggeber die einfachen Nutzungsrechte an den erstellten Werken für den vereinbarten Zweck. Das Urheberrecht verbleibt beim Auftragnehmer.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          Der Auftragnehmer ist berechtigt, die erstellten Arbeiten zu Referenzzwecken in seinem Portfolio zu verwenden, sofern der Auftraggeber nicht ausdrücklich widerspricht.
        </p>
      </Section>

      <Section title="8. Haftung">
        <p>
          Der Auftragnehmer haftet nur für Schäden, die auf grober Fahrlässigkeit oder Vorsatz beruhen. Die Haftung für leichte Fahrlässigkeit ist — soweit gesetzlich zulässig — ausgeschlossen. Die Haftung ist auf den Auftragswert des jeweiligen Projekts begrenzt.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          Der Auftraggeber trägt die Verantwortung dafür, dass die von ihm gelieferten Inhalte (Texte, Bilder, Logos) frei von Rechten Dritter sind. Der Auftragnehmer haftet nicht für Rechtsverletzungen, die sich aus vom Auftraggeber bereitgestellten Materialien ergeben.
        </p>
      </Section>

      <Section title="9. Vertraulichkeit">
        <p>
          Beide Parteien verpflichten sich, alle im Rahmen des Projekts erlangten vertraulichen Informationen — insbesondere Geschäftsdaten, Konzepte und interne Abläufe — vertraulich zu behandeln und nicht an Dritte weiterzugeben.
        </p>
      </Section>

      <Section title="10. Kündigung">
        <p>
          Jede Partei kann den Vertrag aus wichtigem Grund fristlos kündigen. Bei Kündigung durch den Auftraggeber ohne wichtigen Grund sind bereits erbrachte Leistungen vollständig zu vergüten; für noch nicht erbrachte Leistungen ist eine Ausfallentschädigung von 30 % des vereinbarten Honorars fällig.
        </p>
      </Section>

      <Section title="11. Schlussbestimmungen">
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist — soweit gesetzlich zulässig — der Sitz des Auftragnehmers. Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
        </p>
      </Section>

      <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(251,251,244,0.08)" }}>
        <Link href="/" style={{ color: "rgba(251,251,244,0.4)", fontSize: "0.875rem", textDecoration: "none" }}>
          ← Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2 style={{
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "rgba(251,251,244,0.35)",
        marginBottom: "0.75rem",
      }}>
        {title}
      </h2>
      <div style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(251,251,244,0.75)" }}>
        {children}
      </div>
    </div>
  );
}
