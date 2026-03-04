import { Section } from "@/components/layout/section";
import { Prose } from "@/components/ui/prose";
import { generateMetadata } from "@/utils/metadata";
import Markdown from "react-markdown";

export const metadata = generateMetadata({
  title: "Allgemeine Geschäftsbedingungen",
  description:
    "Lies unsere Nutzungsbedingungen und rechtlichen Vereinbarungen für die Nutzung unserer Plattform",
});

export default function TermsAndConditions() {
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
# Allgemeine Geschäftsbedingungen

**Gültig ab:** [Datum einfügen]

Willkommen bei PumpItClub! Diese Allgemeinen Geschäftsbedingungen regeln deine Nutzung unserer Website, Produkte und Dienstleistungen. Durch den Zugriff auf oder die Nutzung unserer Dienste erklärst du dich mit diesen Allgemeinen Geschäftsbedingungen einverstanden. Wenn du nicht einverstanden bist, nutze bitte unsere Dienste nicht.

## 1. Definitionen

-  **"Dienst"** bezieht sich auf die von PumpItClub bereitgestellten Dienstleistungen, einschließlich, aber nicht beschränkt auf Mitgliedschaftszugang, Online-Kurse, Trainings- und Ernährungspläne sowie digitale Produkte.
-  **"Nutzer"** bezieht sich auf jede Person oder Entität, die auf unsere Dienste zugreift oder sie nutzt.
-  **"Inhalt"** bezieht sich auf alle Texte, Bilder, Videos oder andere Materialien, die von PumpItClub über den Dienst bereitgestellt werden.

## 2. Annahme der Bedingungen

Durch die Nutzung unseres Dienstes bestätigst du, dass du mindestens 18 Jahre alt bist oder die Zustimmung deiner Eltern hast, unsere Dienste zu nutzen. Du erklärst dich damit einverstanden, während des Registrierungsprozesses genaue, aktuelle und vollständige Informationen anzugeben und diese Informationen aktuell zu halten.

## 3. Kontoregistrierung

Um auf bestimmte Funktionen unseres Dienstes zuzugreifen, musst du möglicherweise ein Konto erstellen. Du bist verantwortlich für die Vertraulichkeit deiner Kontoinformationen und für alle Aktivitäten, die unter deinem Konto stattfinden. Du erklärst dich damit einverstanden, uns sofort über jede unbefugte Nutzung deines Kontos zu benachrichtigen.

## 4. Zahlungsbedingungen

-  **Abonnementgebühren:** Wenn du ein Abonnement kaufst, erklärst du dich damit einverstanden, alle mit deinem Abonnement verbundenen Gebühren zu zahlen. Alle Zahlungen sind nicht erstattungsfähig, sofern nicht anders angegeben.
-  **Abrechnung:** Du ermächtigst uns, deine angegebene Zahlungsmethode für die Abonnementgebühren und alle anfallenden Steuern zu belasten.

## 5. Lizenz zur Nutzung des Dienstes

Vorbehaltlich deiner Einhaltung dieser Bedingungen gewährt dir PumpItClub eine eingeschränkte, nicht ausschließliche, nicht übertragbare Lizenz, auf den Dienst zuzugreifen und ihn für deine persönlichen oder internen Geschäftszwecke zu nutzen.

## 6. Nutzerverhalten

Du erklärst dich damit einverstanden, den Dienst nicht zu nutzen für:
-  Jegliche rechtswidrige Zwecke.
-  Die Nachahmung einer Person oder Entität.
-  Die Übertragung von schädlichem oder bösartigem Code.
-  Die Störung oder Beeinträchtigung der Sicherheit, Integrität oder Leistung des Dienstes.

## 7. Geistiges Eigentum

Alle über den Dienst bereitgestellten Inhalte sind Eigentum von PumpItClub oder seiner Lizenzgeber und sind durch Gesetze zum geistigen Eigentum geschützt. Du darfst keine Inhalte ohne unsere ausdrückliche schriftliche Genehmigung reproduzieren, verteilen oder abgeleitete Werke erstellen.

## 8. Kündigung

Wir können deinen Zugang zum Dienst jederzeit ohne vorherige Ankündigung oder Haftung aus jedem Grund kündigen oder aussetzen, einschließlich, wenn du gegen diese Bedingungen verstößt. Bei Kündigung erlischt dein Recht zur Nutzung des Dienstes sofort.

## 9. Haftungsausschluss

Der Dienst wird „wie besehen“ und „wie verfügbar“ bereitgestellt. PumpItClub gibt keine Garantien, weder ausdrücklich noch stillschweigend, bezüglich des Dienstes, einschließlich, aber nicht beschränkt auf seine Verfügbarkeit, Zuverlässigkeit oder Eignung für einen bestimmten Zweck.

## 10. Haftungsbeschränkung

Im gesetzlich zulässigen Umfang haftet PumpItClub nicht für indirekte, zufällige, besondere, Folgeschäden oder Strafschäden, die aus deiner Nutzung des Dienstes entstehen oder damit zusammenhängen.

## 11. Freistellung

Du erklärst dich damit einverstanden, PumpItClub, seine Tochtergesellschaften und ihre jeweiligen leitenden Angestellten, Direktoren, Mitarbeiter und Vertreter von allen Ansprüchen, Verlusten, Haftungen, Schäden, Kosten oder Ausgaben freizustellen, die aus deiner Nutzung des Dienstes oder deiner Verletzung dieser Bedingungen entstehen.

## 12. Änderungen der Bedingungen

Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Wir werden dich über Änderungen informieren, indem wir die neuen Bedingungen auf unserer Website veröffentlichen. Deine fortgesetzte Nutzung des Dienstes nach Änderungen stellt deine Annahme der neuen Bedingungen dar.

## 13. Anwendbares Recht

Diese Bedingungen unterliegen den Gesetzen der Bundesrepublik Deutschland, ohne Rücksicht auf deren Kollisionsnormen.

## 14. Kontaktinformationen

Wenn du Fragen zu diesen Bedingungen hast, kontaktiere uns bitte unter:

PumpItClub  
[Deine Adresse]  
[Deine E-Mail-Adresse]  
[Deine Telefonnummer]  

---

**Zuletzt aktualisiert:** [Datum einfügen]

          `}
        </Markdown>
      </Prose>
    </Section>
  );
}
