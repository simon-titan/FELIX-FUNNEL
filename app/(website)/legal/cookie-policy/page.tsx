import { Section } from "@/components/layout/section";
import { Prose } from "@/components/ui/prose";
import { generateMetadata } from "@/utils/metadata";
import Markdown from "react-markdown";

export const metadata = generateMetadata({
  title: "Cookie-Richtlinie",
  description:
    "Erfahre, wie wir Cookies und ähnliche Technologien verwenden, um deine Erfahrung zu verbessern",
});

export default function CookiePolicy() {
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
# Cookie-Richtlinie

**Stand:** [Datum einfügen]

PumpItClub verwendet Cookies und ähnliche Technologien, um dein Erlebnis auf unserer Website und in unseren Diensten zu verbessern. Diese Cookie-Richtlinie erklärt, was Cookies sind, wie wir sie verwenden, wie Drittanbieter Cookies auf dem Dienst nutzen können, welche Wahlmöglichkeiten du hast und weitere Informationen zu Cookies.

## 1. Was sind Cookies?

Cookies sind kleine Textdateien, in denen kleine Informationsmengen gespeichert werden. Sie werden auf deinem Gerät gespeichert, wenn die Website in deinem Browser geladen wird. Diese Cookies helfen uns dabei, die Website ordnungsgemäß zu betreiben, sie sicherer zu machen, ein besseres Nutzererlebnis zu bieten und zu verstehen, wie die Website funktioniert und wo Verbesserungen nötig sind.

## 2. Wie PumpItClub Cookies verwendet

Wenn du den Dienst nutzt, können wir eine Reihe von Cookie-Dateien in deinem Browser speichern. Wir verwenden Cookies für folgende Zwecke:

- **Notwendige Cookies:** Wir verwenden Cookies, um Informationen zu speichern, die das Verhalten oder Erscheinungsbild des Dienstes beeinflussen, z. B. die Sprachauswahl.
- **Kontobezogene Cookies:** Wir verwenden Cookies für den Registrierungsprozess und die allgemeine Verwaltung. Diese Cookies werden in der Regel beim Abmelden gelöscht; in einigen Fällen können sie danach bestehen bleiben, um deine Seiteneinstellungen zu speichern.
- **Analyse-Cookies:** Wir verwenden Cookies, um zu analysieren, wie Besucher den Dienst nutzen und die Leistung der Website zu überwachen. So können wir das Angebot anpassen und Probleme schnell erkennen und beheben.
- **Werbung-Cookies:** Wir können Cookies verwenden, um dir relevante Werbung anzuzeigen.

## 3. Cookies von Drittanbietern

Zusätzlich zu unseren eigenen Cookies können wir Cookies von Drittanbietern verwenden, um Nutzungsstatistiken zu erfassen und Werbung auf und über den Dienst auszuliefern. Diese Cookies unterliegen den jeweiligen Datenschutzrichtlinien der Drittanbieter.

## 4. Deine Wahlmöglichkeiten

Wenn du Cookies auf der Website vermeiden möchtest, musst du die Verwendung von Cookies in deinem Browser deaktivieren und die mit dieser Website verbundenen Cookies löschen. Du kannst diese Option jederzeit nutzen.

- **Browser-Einstellungen:** Die meisten Browser erlauben die Steuerung von Cookies in den Einstellungen. Weitere Informationen zu Cookies findest du unter [www.allaboutcookies.org](http://www.allaboutcookies.org/) oder [www.youronlinechoices.eu](http://www.youronlinechoices.eu/).

- **Widerspruch:** Du kannst gezielter Werbung widersprechen, indem du folgende Seiten besuchst:
  - [Network Advertising Initiative](http://www.networkadvertising.org/)
  - [Digital Advertising Alliance](http://www.aboutads.info/)
  - [Your Online Choices](http://www.youronlinechoices.eu/)

## 5. Änderungen dieser Cookie-Richtlinie

Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren. Über Änderungen informieren wir, indem wir die neue Fassung auf dieser Seite veröffentlichen. Wir empfehlen, diese Cookie-Richtlinie regelmäßig zu prüfen. Änderungen gelten mit der Veröffentlichung auf dieser Seite.

## 6. Kontakt

Bei Fragen zu dieser Cookie-Richtlinie erreichst du uns unter:

PumpItClub  
[Adresse]  
[E-Mail-Adresse]  
[Telefonnummer]  

---

**Zuletzt aktualisiert:** [Datum einfügen]
          `}
        </Markdown>
      </Prose>
    </Section>
  );
}
