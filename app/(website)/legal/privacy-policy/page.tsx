import { Section } from "@/components/layout/section";
import { Prose } from "@/components/ui/prose";
import { generateMetadata } from "@/utils/metadata";
import Markdown from "react-markdown";

export const metadata = generateMetadata({
  title: "Datenschutzerklärung",
  description:
    "Erfahre, wie wir deine persönlichen Informationen sammeln, verwenden und schützen",
});

export default function PrivacyPolicy() {
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
          {`# Datenschutzerklärung

## KUNDENINFORMATION ZUM DATENSCHUTZ

Sehr geehrte Kundin, sehr geehrter Kunde,

der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Nach der EU-Datenschutz-Grundverordnung (DSGVO) sind wir verpflichtet, Sie darüber zu informieren, zu welchem Zweck unser Unternehmen Daten erhebt, speichert oder weiterleitet. Der Information können Sie auch entnehmen, welche Rechte Sie in puncto Datenschutz haben.

## 1. VERANTWORTLICHKEIT FÜR DIE DATENVERARBEITUNG

Verantwortlich für die Datenverarbeitung ist die:

Pump It Club  
Schachhaldenweg 15  
73529 Schwäbisch Gmünd

## 2. ZWECK DER DATENVERARBEITUNG

Die Datenverarbeitung erfolgt aufgrund gesetzlicher Vorgaben, um das Vertragsverhältnis zwischen Ihnen und uns und die damit verbundenen Pflichten zu erfüllen.

Hierzu verarbeiten wir Ihre personenbezogenen Daten, insbesondere Ihre Kontaktdaten. Dazu zählen u.a. Name, Adresse, Telefonnummer.

Die Erhebung von Kontaktdaten ist Voraussetzung für die Erfüllung des Vertrags. Werden die notwendigen Informationen nicht bereitgestellt, kann eine sorgfältige Bearbeitung nicht erfolgen.

## 3. EMPFÄNGER IHRER DATEN

Wir übermitteln Ihre personenbezogenen Daten nur dann an Dritte, wenn dies gesetzlich erlaubt ist oder Sie eingewilligt haben.

Empfänger Ihrer personenbezogenen Daten können vor allem verbundene Unternehmen, Versicherungen und Behörden sein.

Die Übermittlung erfolgt überwiegend zum Zwecke der Erfüllung des Vertragsverhältnisses mit Ihnen und zur Informationsbeschaffung, als auch der Abrechnung der bei Ihnen erbrachten Leistungen. Im Einzelfall erfolgt die Übermittlung von Daten an weitere berechtigte Empfänger.

## 4. SPEICHERUNG IHRER DATEN

Wir bewahren Ihre personenbezogenen Daten nur solange auf, wie dies für die Durchführung des Vertragsverhältnisses erforderlich ist.

Aufgrund rechtlicher Vorgaben sind wir gegebenenfalls dazu verpflichtet, Ihre Daten mindestens 10 Jahre nach Abschluss des Vertragsverhältnisses aufzubewahren.

## 5. IHRE RECHTE

Sie haben das Recht, über die Sie betreffenden personenbezogenen Daten Auskunft zu erhalten. Auch können Sie die Berichtigung unrichtiger Daten verlangen.

Darüber hinaus steht Ihnen unter bestimmten Voraussetzungen das Recht auf Löschung von Daten, das Recht auf Einschränkung der Datenverarbeitung sowie das Recht auf Datenübertragbarkeit zu.

Die Verarbeitung Ihrer Daten erfolgt auf Basis von gesetzlichen Regelungen. Nur in Ausnahmefällen benötigen wir Ihr Einverständnis. In diesen Fällen haben Sie das Recht, die Einwilligung für die zukünftige Verarbeitung zu widerrufen.

Sie haben ferner das Recht, sich bei der zuständigen Aufsichtsbehörde für den Datenschutz zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten nicht rechtmäßig erfolgt.

Die Anschrift der für uns zuständigen Aufsichtsbehörde lautet:

Landesbeauftragter für Datenschutz und Informationsfreiheit Baden-Württemberg  
Königstraße 10a  
70173 Stuttgart

## 6. RECHTLICHE GRUNDLAGEN

Rechtsgrundlage für die Verarbeitung Ihrer Daten ist Artikel 9 Absatz 2 lit. h) DSGVO in Verbindung mit Paragraf 22 Absatz 1 Nr. 1 lit. b) Bundesdatenschutzgesetz. Sollten Sie Fragen haben, können Sie sich gern an uns wenden.
`}
        </Markdown>
      </Prose>
    </Section>
  );
}
