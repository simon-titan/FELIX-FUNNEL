"use client";

import { Box, Heading, Text, VStack, Card, CardBody, Image, Flex } from "@chakra-ui/react";
import { Section } from "@/components/layout/section";

export function SolutionSection() {
  const solutionCards = [
    {
      imageSrc: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=640&q=80",
      title: "Schmerzfrei & beweglich",
      subheading: "Verabschiede dich von Rückenschmerzen",
      text: "Statt nach 8 Stunden Sitzen mit Verspannungen nach Hause zu kommen, wirst du durch unseren Ansatz wieder beweglicher. Gezielte Übungen für den Alltag und Faszientraining lösen die Blockaden, du sitzt aufrechter, atmest freier und fühlst dich einfach leichter.",
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=640&q=80",
      title: "Volle Energie von früh bis spät",
      subheading: "Ohne Kaffee Tiefs und Mittagsschlaf",
      text: "Deine Ernährung wird auf deinen Alltag abgestimmt, kein Chaos mehr, sondern klare Strukturen, die dir Power geben. Du schaffst den ganzen Tag, ohne um 15 Uhr einzubrechen, und hast abends noch Energie für Familie oder dich selbst.",
    },
    {
      imageSrc: "/hero-funnel/problems/sleep.png",
      title: "Tiefenentspannung & erholsamer Schlaf",
      subheading: "Dein Kopf schaltet endlich ab",
      text: "Durch aktive Regenerationsphasen und unsere Stressmanagement Tools lernst du, den „Aus Knopf“ zu finden. Dein Körper kommt zur Ruhe, die Gedanken hören auf zu kreisen. Ergebnis: Du schläfst durch, wachst erholt auf und bist mental stärker für die nächsten Herausforderungen.",
    },
    {
      imageSrc: "/hero-funnel/problems/dream.png",
      title: "Dein Traumkörper, definiert & gesund",
      subheading: "Die Kilos purzeln, der Stoffwechsel läuft",
      text: "Mit unserem Coaching schaffst du es, den Stoffwechsel wieder anzukurbeln. Du bekommst einfache Ernährungsstrategien, die auch im stressigen Alltag funktionieren. Das Ergebnis: Du fühlst dich wohl in deiner Haut, siehst fit aus und deine Lieblingskleidung passt wieder perfekt.",
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=640&q=80",
      title: "Klarer Kopf & volle Konzentration",
      subheading: "Triff bessere Entscheidungen, jeden Tag",
      text: "Sobald Bewegung und gesunde Ernährung Teil deines Alltags werden, steigt deine kognitive Leistung. Kein Brain Fog mehr, keine Vergesslichkeit. Du denkst klarer, reagierst schneller und kannst dich wieder voll und ganz auf deine wichtigsten Aufgaben konzentrieren.",
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=640&q=80",
      title: "Deine Routine, effizient & machbar",
      subheading: "Endlich Sport in den vollen Terminkalender integrieren",
      text: "Wir zeigen dir, wie du mit kurzen, aber hocheffektiven Einheiten das Maximum aus deiner Zeit holst. Keine stundenlangen Gym Besuche mehr, sondern smarte Workouts, die in deinen Alltag passen. So wird Sport endlich zur Gewohnheit, und nicht zur Last.",
    },
  ];

  return (
    <Section pt={8} pb={12} style={{ paddingInline: "0 !important" }} id="solutions-section">
      <VStack gap={5} textAlign="center" mx="auto">
        <VStack gap={2}>
          <Text fontSize="xs" fontWeight="bold" letterSpacing="wider" color="green.600" textTransform="uppercase">
            Die Lösung
          </Text>
          <Heading as="h2" size="xl" fontWeight="extrabold" color="gray.800" lineHeight="tight">
            So drehst du es um.
          </Heading>
          <Text fontSize="md" color="gray.600">
            Mit dem richtigen System wird alles besser – Energie, Körper und Kopf.
          </Text>
        </VStack>
        {/* Gespiegelt: Scroll von rechts nach links (RTL), Wischen anders herum als Problem */}
        <Box
          width="100vw"
          maxW="100vw"
          overflowX="auto"
          overflowY="hidden"
          pb={3}
          pr={0}
          className="problem-cards-scroll"
          dir="rtl"
        >
          <Flex gap={4} width="max-content" minW="min-content" pl={0} pr={{ base: 4, md: 6 }} dir="rtl">
            {solutionCards.map((card, index) => (
              <Card.Root
                key={index}
                flexShrink={0}
                w={{ base: "280px", sm: "320px" }}
                dir="ltr"
                overflow="hidden"
                borderRadius="lg"
                border="1px solid"
                borderColor="green.200"
                bg="rgba(187, 247, 208, 0.4)"
                backdropFilter="blur(12px)"
                boxShadow="0 8px 32px rgba(34, 197, 94, 0.15)"
                _hover={{
                  boxShadow: "0 12px 40px rgba(34, 197, 94, 0.2)",
                  transform: "translateY(-4px)",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <Box position="relative" height="180px" width="full" overflow="hidden">
                  <Image src={card.imageSrc} alt={card.title} objectFit="cover" width="full" height="full" />
                  {/* Transparenter Verlauf: oben durchsichtig, unten abgedunkelt (Hex) */}
                  <Box
                    position="absolute"
                    inset="0"
                    style={{
                      background: "linear-gradient(to bottom, #00000000 0%, #0000008C 100%)",
                    }}
                    pointerEvents="none"
                  />
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    p={3}
                    bgGradient="linear(to-t, blackAlpha.800, transparent)"
                    color="white"
                  >
                    <Heading as="h3" size="sm" fontWeight="bold">
                      {card.title}
                    </Heading>
                  </Box>
                </Box>
                <Card.Body p={5} textAlign="left">
                  <Text fontWeight="semibold" color="gray.800" mt={1} fontSize="sm">
                    {card.subheading}
                  </Text>
                  <Text fontSize="xs" color="gray.600" lineHeight="tall">
                    {card.text}
                  </Text>
                </Card.Body>
              </Card.Root>
            ))}
          </Flex>
        </Box>
      </VStack>
    </Section>
  );
}
