"use client";

import { Box, Heading, Text, VStack, Card, CardBody, Image, Flex } from "@chakra-ui/react";
import { Section } from "@/components/layout/section";

export function ProblemSection() {
  const problemCards = [
    {
      imageSrc: "/hero-funnel/problems/schmerzen.png",
      title: "Rückenschmerzen & Verspannungen",
      subheading: "Die Folge von stundenlangem Sitzen",
      text: "Ob im Büro oder im Homeoffice, als High Performer verbringst du oft 10+ Stunden am Tag im Sitzen. Die Muskulatur verkürzt, die Bandscheiben werden einseitig belastet. Irgendwann wird aus dem gelegentlichen Ziehen ein chronischer Schmerz, der dich im Job und im Privatleben ausbremst.",
    },
    {
      imageSrc: "/hero-funnel/problems/erschoepft.png",
      title: "Energiemangel & Antriebslosigkeit",
      subheading: "Wenn dir ständig die Kraft fürs Wesentliche fehlt",
      text: "Du startest mit drei Kaffees in den Tag, aber schon nachmittags fällst du ins Tief. Deine Ernährung besteht aus schnellen Snacks, das Training bleibt auf der Strecke. Die Folge: Deine Energie reicht gerade noch für die Arbeit, für Familie, Hobbys oder dich selbst bleibt nichts übrig.",
    },
    {
      imageSrc: "/hero-funnel/problems/stress.png",
      title: "Stress & Schlafstörungen",
      subheading: "Dein Kopf schaltet nie ab",
      text: "Hoher Verantwortungsdruck, ständige Erreichbarkeit und Deadlines lassen dich auch nach Feierabend nicht los. Die Gedanken kreisen, der Schlaf wird zur Mangelware. Ohne Regeneration leidet nicht nur deine Leistungsfähigkeit, sondern auch deine Gesundheit, langfristig droht der Burnout.",
    },
    {
      imageSrc: "/hero-funnel/problems/dick.png",
      title: "Gewichtszunahme & Stoffwechselträgheit",
      subheading: "Wenn die Kilos trotz Stress nicht purzeln",
      text: "Du hast wenig Zeit für frische Mahlzeiten, isst oft unterwegs oder im Meeting. Gleichzeitig signalisiert der Körper durch Cortisolausschüttung „Fettspeichern“. Die Hose spannt, die Waage geht nach oben, und du fühlst dich in deiner Haut nicht mehr wohl.",
    },
    {
      imageSrc: "/hero-funnel/problems/brain.png",
      title: "Konzentrationsprobleme & Brain Fog",
      subheading: "Wenn der Kopf nicht mehr klar denkt",
      text: "Zu wenig Bewegung, unregelmäßige Mahlzeiten und Dauerstress lassen deine geistige Leistungskurve sinken. Du bist vergesslicher, brauchst länger für Entscheidungen und verlierst den Fokus. Dabei brauchst du gerade als Führungskraft einen klaren Kopf, jeden Tag.",
    },
    {
      imageSrc: "/hero-funnel/problems/time.png",
      title: "Zeitmangel & fehlende Sportroutine",
      subheading: "Zwischen Meeting und Familie bleibt kein Platz für dich",
      text: "Du weißt, wie wichtig Sport wäre, aber zwischen 60 Stunden Woche und Familienaufgaben findest du einfach keine Lücke. Selbst wenn du dir vornimmst, abends zu trainieren, siegt am Ende die Erschöpfung. Die Folge: Die Fitness rutscht immer weiter nach hinten, und mit ihr deine Gesundheit.",
    },
  ];

  return (
    <Section pt={12} pb={0}  id="problem-section" px="0" maxW="100vw" overflowX="hidden" >
      <VStack gap={5} textAlign="center" mx="auto" w="full">
        <VStack gap={2} px={{ base: 4, md: 6 }}>
          <Text fontSize="xs" fontWeight="bold" letterSpacing="wider" color="red.500" textTransform="uppercase">
            Das Problem
          </Text>
          <Heading as="h2" size="xl" fontWeight="extrabold" color="gray.800" lineHeight="tight">
            Kennst du das?
          </Heading>
          <Text fontSize="md" color="gray.600">
            Du bist nicht zu schwach – du hast einfach das falsche System.
          </Text>
        </VStack>
        {/* Horizontal scrollbare Cards – bündig bis Viewport-Rand, Scrollbar ausgeblendet */}
        <Box
          w="100vw"
          maxW="100vw"
          overflowX="auto"
          overflowY="hidden"
          pb={3}
          paddingInline={0}
          className="problem-cards-scroll"
        >
          <Flex gap={4} width="max-content" minW="min-content" pl={{ base: 4, md: 6 }} pr={0}>
            {problemCards.map((card, index) => (
              <Card.Root
                key={index}
                flexShrink={0}
                w={{ base: "280px", sm: "320px" }}
                overflow="hidden"
                borderRadius="lg"
                border="1px solid"
                borderColor="red.200"
                bg="rgba(254, 202, 202, 0.4)"
                backdropFilter="blur(12px)"
                boxShadow="0 8px 32px rgba(220, 38, 38, 0.05)"
                _hover={{
                  boxShadow: "0 12px 40px rgba(220, 38, 38, 0.1)",
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
