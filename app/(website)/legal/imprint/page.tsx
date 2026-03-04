import { Section } from "@/components/layout/section";
import { Prose } from "@/components/ui/prose";
import { generateMetadata } from "@/utils/metadata";
import Markdown from "react-markdown";

export const metadata = generateMetadata({
  title: "Impressum",
  description: "Angaben gemäß § 5 TMG",
});

export default function Imprint() {
  return (
    <Section>
      <Prose
        mx="auto"
        size="lg"
        mt={{ base: "28", md: "32" }}
        px={{ base: "4", sm: "5", md: "0" }}
        py={{ base: "6", md: "8" }}
      >
        <Markdown>
          {`
# Impressum

**Angaben gemäß § 5 TMG**

## Anbieter / Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:

Pump It Club  
Schachhaldenweg 15  
73529 Schwäbisch Gmünd  
Deutschland

**Inhaber / Founder:** Felix Mangold

**Kontaktaufnahme:**  
E-Mail: support@pump-it-club.com

## Umsatzsteuer-ID

Umsatzsteuer-Identifikationsnummer gem. § 27 a Umsatzsteuergesetz:  
DE 356 561 394

## Haftungsausschluss:

### Haftung für Inhalte

Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.

### Haftung für Links

Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.

### Urheberrecht

Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.

---

**Stand:** März 2025
          `}
        </Markdown>
      </Prose>
    </Section>
  );
}
