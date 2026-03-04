import { Heading,Text } from "@chakra-ui/react";
import { generateMetadata } from "@/utils/metadata";
import { Section } from "@/components/layout/section";
import ProtectedRoute from "@/components/auth/protect-route";

export const metadata = generateMetadata({
  title: "Basis Plan",
  description: "Einblicke wie unsere Case-Studys arbeiten",
  noIndex: true,
});

export default function Basic() {
  return (
    <ProtectedRoute plansWithAccess="pro">
      <Section header>
        <Heading>Basis Plan</Heading>
        <Text mt="4">
          Willkommen im Basis Plan! Hier erhältst du detaillierte Einblicke 
          in wie unsere Case-Studys arbeiten. Lerne von erfolgreichen Beispielen 
          und verstehe, wie andere Experten ihre Geschäfte skalieren.
        </Text>
      </Section>
    </ProtectedRoute>
  );
}
