"use client";

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
  Card,
  chakra,
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { Image } from "@/components/ui/image";
import { CheckCircle, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";

interface MeetTheFounderSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  achievements?: string[];
  missionText?: string;
}

const defaultAchievements = [
  "Vollzeit Fitnesscoach",
  "Vielen Menschen geholfen, körperliche und mentale Grenzen zu überschreiten",
  "Über 220 kg Kreuzheben",
  "Diverse Trainerzertifikate absolviert",
];

const defaultMissionText =
  "anderen zeigen, wie sie strukturiert ihre eigene Fitness-Transformation starten können.";

export const MeetTheFounderSection = ({
  imageSrc = "/landingpage/VorherNachher.webp",
  imageAlt = "Felix - Gründer von PumpItClub",
  achievements = defaultAchievements,
  missionText = defaultMissionText,
}: MeetTheFounderSectionProps) => {
  return (
    <Section
      pt={{ base: 12, md: 16 }}
      pb={{ base: 12, md: 20 }}
      bg="gray.50"
      px={{ base: 4, sm: 6, md: 8, lg: 10 }}
    >
      <VStack
        gap={{ base: 6, md: 8 }}
        align="stretch"
        maxW="6xl"
        mx="auto"
        w="full"
      >
        {/* Kreisbild ganz oben – grüner Hintergrund */}
        <VStack gap={{ base: 4, md: 5 }}>
          <Box
            position="relative"
            w={{ base: "140px", sm: "160px", md: "180px" }}
            h={{ base: "140px", sm: "160px", md: "180px" }}
            flexShrink={0}
            borderRadius="full"
            overflow="hidden"
            bg="green.500"
            border="4px solid"
            borderColor="green.400"
            boxShadow="0 8px 32px rgba(34, 197, 94, 0.35)"
          >
            <Image
              src="/hero-funnel/personal/Auf Sympathisch.png"
              alt="Felix - Gründer PumpItClub"
              width={200}
              height={200}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </Box>

          {/* LinkedIn & Instagram direkt unter dem Kreis */}
          <HStack gap={4} justify="center">
            <chakra.a
              href="https://www.instagram.com/felix_mangold/"
              target="_blank"
              rel="noopener noreferrer"
              w="12"
              h="12"
              borderRadius="full"
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="gray.600"
              transition="all 0.3s ease"
              boxShadow="0 2px 8px rgba(0,0,0,0.06)"
              _hover={{
                bg: "rgba(228, 64, 95, 0.1)",
                borderColor: "#E4405F",
                color: "#E4405F",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 16px rgba(228, 64, 95, 0.25)",
              }}
            >
              <InstagramLogo size={24} weight="fill" />
            </chakra.a>
            <chakra.a
              href="https://www.linkedin.com/in/felix-mangold-performance-coaching/"
              target="_blank"
              rel="noopener noreferrer"
              w="12"
              h="12"
              borderRadius="full"
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="gray.600"
              transition="all 0.3s ease"
              boxShadow="0 2px 8px rgba(0,0,0,0.06)"
              _hover={{
                bg: "rgba(0, 119, 181, 0.1)",
                borderColor: "#0077B5",
                color: "#0077B5",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 16px rgba(0, 119, 181, 0.25)",
              }}
            >
              <LinkedinLogo size={24} weight="fill" />
            </chakra.a>
          </HStack>
        </VStack>

        {/* Section Label */}
        <Text
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="wider"
          color="green.600"
          textTransform="uppercase"
          textAlign="center"
        >
          Über den Gründer
        </Text>

        {/* Headline + Einleitung unter dem Kreis */}
        <VStack gap={3} textAlign="center">
          <Heading
            as="h2"
            size={{ base: "xl", md: "2xl" }}
            fontWeight="extrabold"
            color="gray.800"
            lineHeight="tight"
          >
            Hi, ich bin{" "}
            <Text
              as="span"
              color="green.600"
              textDecoration="underline"
              textDecorationColor="green.500"
            >
              Felix
            </Text>
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.600"
            maxW="2xl"
            mx="auto"
            lineHeight="tall"
          >
            Fitness ist meine lebenslange Leidenschaft und meine Berufung. Mein
            Antrieb ist es, Menschen ganzheitlich zu transformieren – dich
            körperlich stärker und mental selbstbewusster zu machen. Es erfüllt
            mich, anderen zu helfen, ihre Grenzen zu verschieben und die beste
            Version ihrer selbst zu entdecken.{" "}
            <Text as="span" color="green.600" fontWeight="bold">
              Dafür lebe ich.
            </Text>
          </Text>
        </VStack>

        {/* Hero-Element: Portrait + 3 Cards (wie in Hero Section) */}
        <VStack gap={0} w="full" maxW={{ base: "320px", md: "560px" }} mx="auto">
          <Box
            position="relative"
            minW={{ base: "260px", md: "420px" }}
            maxW={{ base: "280px", md: "440px" }}
            mx="auto"
            w="full"
            borderRadius="xl"
            overflow="hidden"
            border="1.5px solid"
            borderColor="gray.200"
            boxShadow="0 8px 32px rgba(70, 70, 70, 0.15)"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={880}
              height={1100}
              sizes="(max-width: 768px) 280px, 440px"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
          <SimpleGrid
            columns={3}
            gap={{ base: 3, md: 3 }}
            w="full"
            mt={{ base: -8, md: -8 }}
            position="relative"
            zIndex={1}
          >
            <Card.Root
              borderRadius="lg"
              border="1px solid"
              borderColor="red.200"
              overflow="hidden"
              bg="rgba(254, 202, 202, 0.4)"
              backdropFilter="blur(12px)"
              boxShadow="0 8px 32px rgba(220, 38, 38, 0.15)"
            >
              <Card.Body
                textAlign="center"
                py={{ base: 3, md: 4 }}
                px={{ base: 2, md: 3 }}
              >
                <VStack gap={0.5}>
                  <Text
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight="bold"
                    color="red.600"
                    lineHeight="1"
                  >
                    -16
                  </Text>
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="semibold"
                    color="red.800"
                  >
                    kg Fett
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>
            <Card.Root
              borderRadius="lg"
              border="1px solid"
              borderColor="green.200"
              overflow="hidden"
              bg="rgba(187, 247, 208, 0.4)"
              backdropFilter="blur(12px)"
              boxShadow="0 8px 32px rgba(34, 197, 94, 0.15)"
            >
              <Card.Body
                textAlign="center"
                py={{ base: 3, md: 4 }}
                px={{ base: 2, md: 3 }}
              >
                <VStack gap={0.5}>
                  <Text
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight="bold"
                    color="green.600"
                    lineHeight="1"
                  >
                    +6kg
                  </Text>
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="semibold"
                    color="green.800"
                  >
                    Muskeln
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>
            <Card.Root
              borderRadius="lg"
              border="1px solid"
              borderColor="green.200"
              overflow="hidden"
              bg="rgba(187, 247, 208, 0.4)"
              backdropFilter="blur(12px)"
              boxShadow="0 8px 32px rgba(34, 197, 94, 0.15)"
            >
              <Card.Body
                textAlign="center"
                py={{ base: 3, md: 4 }}
                px={{ base: 2, md: 3 }}
              >
                <VStack gap={0.5}>
                  <Text
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight="bold"
                    color="green.600"
                    lineHeight="1"
                  >
                    +80%
                  </Text>
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="semibold"
                    color="green.800"
                  >
                    Wohlbefinden
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>
          </SimpleGrid>
        </VStack>

        {/* 3 Jahre später – Box */}
        <Box
          w="full"
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
          p={{ base: 5, md: 6 }}
          boxShadow="0 4px 20px rgba(0,0,0,0.06)"
          _hover={{
            borderColor: "green.200",
            boxShadow: "0 8px 28px rgba(34, 197, 94, 0.12)",
          }}
          transition="all 0.3s ease"
        >
          <Heading
            as="h3"
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            color="green.600"
            textAlign="center"
            mb={4}
          >
            3 Jahre später...
          </Heading>
          <VStack gap={3} align="stretch">
            {achievements.map((achievement, index) => (
              <HStack key={index} gap={3} align="flex-start">
                <Box color="green.500" mt="0.5" flexShrink={0}>
                  <CheckCircle size={18} weight="fill" />
                </Box>
                <Text fontSize={{ base: "sm", md: "md" }} color="gray.700" lineHeight="tall">
                  {achievement}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Mission – Box */}
        <Box
          w="full"
          bg="white"
          borderRadius="xl"
          border="2px solid"
          borderColor="green.200"
          p={{ base: 5, md: 6 }}
          boxShadow="0 4px 20px rgba(34, 197, 94, 0.08)"
          _hover={{
            boxShadow: "0 8px 28px rgba(34, 197, 94, 0.15)",
          }}
          transition="all 0.3s ease"
        >
          <Heading
            as="h3"
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="bold"
            color="gray.800"
            textAlign="center"
            lineHeight="tall"
          >
            <Text as="span" color="green.600" fontWeight="bold">
              Meine Mission:
            </Text>{" "}
            {missionText}
          </Heading>
        </Box>
      </VStack>
    </Section>
  );
};
