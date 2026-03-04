"use client";

import { useState } from "react";
import { Box, Heading, Text, VStack, Button, HStack, Circle, SimpleGrid, Card } from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { Image } from "@/components/ui/image";
import { Star } from "@phosphor-icons/react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogCloseTrigger,
} from "@/components/ui/dialog";

const clientImages = [
  "/hero-funnel/clients/1765279404415.jpg",
  "/hero-funnel/clients/1767173817577.jpg",
  "/hero-funnel/clients/1768903210360.jpg",
  "/hero-funnel/clients/images.jpg",
  "/hero-funnel/clients/Screenshot%202026-03-03%20071433.png",
];

export function Hero1() {
  const [signUpOpen, setSignUpOpen] = useState(false);
  return (
    <Section
      pt={{ base: 20, md: 20 }}
      pb={{ base: 12, md: 10 }}
      bg="linear-gradient(180deg, rgba(18, 18, 18, 1) 0%, rgba(34, 197, 94, 1) 25%, rgba(255, 255, 255, 1) 80%)"
    >
      <VStack gap={{ base: 4, md: 3 }} textAlign="center" maxWidth="800px" mx="auto">
        {/* Badge - kompakt */}
        <Box
          as="span"
          display="inline-block"
          px={3}
          py={1.5}
          borderRadius="full"
          bg="green.100"
          color="green.700"
          fontSize="2xs"
          fontWeight="bold"
          letterSpacing="wider"
          textTransform="uppercase"
          border="1px solid"
          borderColor="green.300"
        >
          Für Unternehmer, Manager & High Performer
        </Box>
        {/* Hauptüberschrift – minimal abgesenkt für Abstand zum Badge */}
        <Heading
          as="h1"
          size={{ base: "2xl", md: "4xl" }}
          fontWeight="extrabold"
          lineHeight={{ base: "0.9", md: "shorter" }}
          position="relative"
          color="black"
          mt={{ base: 2, md: 3 }}
        >
          Es wird Zeit für deine{" "}
          <Text
            as="span"
            color="white"
            className="bebas-neue-regular"
            textDecoration="underline"
            textDecorationColor="white"
            display="block"
            mt={{ base: "0.15em", md: "0.1em" }}
            
            fontSize={{ base: "1.9em", md: "1.8em" }}
            position="relative"
            zIndex={1}
          >
            Veränderung
          </Text>
        </Heading>
        {/* Subheadline - auf Desktop größer */}
        <Text
          fontSize={{ base: "xl", md: "3xl" }}
          fontWeight="semibold"
          lineHeight={{ base: "0.9", md: "shorter" }}
          color="black.800"
          mb={{ base: 2, md: 2 }}
        >
          In 16 Wochen{" "}
          <Text
            as="span"
            className="bebas-neue-regular"
            color="white"
            textDecoration="underline"
            textDecorationColor="white"
            textTransform="uppercase"
            display={{ base: "block", md: "inline" }}
            fontSize={{ base: "1.25em", md: "1em" }}
            mt={{ base: 1, md: 0 }}
          >
            garantiere
          </Text>{" "}
          <Text as="span" display={{ base: "block", md: "inline" }}>
            ich dir:
          </Text>
        </Text>

        {/* Portrait – auf Desktop deutlich größer */}
        <Box
          position="relative"
          minW={{ base: "260px", md: "420px" }}
          maxW={{ base: "280px", md: "440px" }}
          borderRadius="xl"
          overflow="hidden"
          border="1.5px solid"
          borderColor="black.200"
          boxShadow="0 8px 32px rgba(70, 70, 70, 0.15)"
        >
          <Image
            scale={1.125}
            top={"-25px"}
            src="/hero-funnel/personal/Vorher Nachher .jpg"
            alt="Porträt"
            width={880}
            height={1100}
            sizes="(max-width: 768px) 280px, 440px"
            style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }}
          />
        </Box>

        {/* Results Cards – überlappen das Bild minimal */}
        <SimpleGrid
          columns={3}
          gap={{ base: 3, md: 3 }}
          mb={{ base: 4, md: 2 }}
          maxW={{ base: "320px", md: "560px" }}
          mx="auto"
          mt={{ base: -8, md: -8 }}
          position="relative"
          zIndex={1}
        >


          {/* Card 1: -10 kg Fett - Rotes Glassmorph */}
          <Card.Root
            borderRadius="lg"
            border="1px solid"
            borderColor="red.200"
            overflow="hidden"
            bg="rgba(254, 202, 202, 0.4)"
            backdropFilter="blur(12px)"
            boxShadow="0 8px 32px rgba(220, 38, 38, 0.15)"
          >
            <Card.Body textAlign="center" py={{ base: 3, md: 4 }} px={{ base: 2, md: 3 }}>
              <VStack gap={0.5}>
                <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" color="red.600" lineHeight="1">
                  -16
                </Text>
                <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="semibold" color="red.800">
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
            <Card.Body textAlign="center" py={{ base: 3, md: 4 }} px={{ base: 2, md: 3 }}>
              <VStack gap={0.5}>
                <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" color="green.600" lineHeight="1">
                  +6kg
                </Text>
                <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="semibold" color="green.600">
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
            <Card.Body textAlign="center" py={{ base: 3, md: 4 }} px={{ base: 2, md: 3 }}>
              <VStack gap={0.5}>
                <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" color="green.600" lineHeight="1">
                  +80%
                </Text>
                <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="semibold" color="green.600">
                  Wohlbefinden
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* CTA zuerst, dann Kundenbewertungen */}
        <VStack gap={{ base: 0.5, md: 0.5 }} mt={{ base: 1, md: 1 }}>
          <Text
            fontSize={{ base: "xl", md: "3xl" }}
            fontWeight="semibold"
            lineHeight={{ base: "0.5", md: "shorter" }}
            color="gray.800"
            textAlign="center"
            mt={{ base: 3, md: 2 }}
          >
            Sichere dir jetzt dein{" "}
            <Text
              as="span"
              className="bebas-neue-regular"
              color="green.600"
              textDecoration="underline"
              textDecorationColor="green.600"
              textTransform="uppercase"
              display={{ base: "block", md: "inline-block" }}
              lineHeight="1.4"
              mt={{ base: 1, md: "0.15em" }}
              fontSize={{ base: "1.25em", md: "1em" }}
            >
              kostenloses
            </Text>{" "}
            Video-Training
          </Text>
          <Box mt={{ base: 6, md: 3 }} display="inline-block">
            <DialogRoot open={signUpOpen} onOpenChange={(e) => setSignUpOpen(!!e.open)}>
              <Button
                type="button"
                p={{ base: 4, md: 5 }}
                size="lg"
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="bold"
                borderRadius="xl"
                bg="green.500"
                color="white"
                border="2px solid"
                borderColor="green.600"
                boxShadow="md"
                className="btn-hero-cta"
                _hover={{ bg: "green.600" }}
                _active={{ transform: "scale(0.98)" }}
                onClick={() => setSignUpOpen(true)}
                aria-label="Jetzt sichern"
              >
                JETZT SICHERN
              </Button>
              <DialogContent maxW="md">
                <DialogHeader>
                  <DialogTitle>Kostenloses Video-Training sichern</DialogTitle>
                  <DialogCloseTrigger />
                </DialogHeader>
                <DialogBody pt={2} pb={6}>
                  <div
                    data-o-auth="1"
                    data-widget-mode="register"
                    data-plan-uid="jW70b0mq"
                    data-plan-payment-term="month"
                    data-skip-plan-options="true"
                    data-mode="embed"
                  />
                </DialogBody>
              </DialogContent>
            </DialogRoot>
          </Box>
          {/* Kundenbewertungen – Profilbilder aus hero-funnel/clients */}
          <HStack gap={{ base: -2.5, md: -3 }} justify="center" mt={{ base: 10, md: 6 }}>
            {clientImages.map((src, i) => (
              <Circle
                key={src}
                size={{ base: "40px", md: "48px" }}
                overflow="hidden"
                flexShrink={0}
                border="2px solid white"
                boxShadow="md"
                position="relative"
                zIndex={clientImages.length - i}
              >
                <Image
                  src={src}
                  alt={`Kunde ${i + 1}`}
                  width={48}
                  height={48}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Circle>
            ))}
          </HStack>
          <HStack gap={0.5}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={20} color="var(--chakra-colors-yellow-400)" weight="fill" />
            ))}
          </HStack>
          <Text fontSize={{ base: "sm", md: "md" }} color="gray.800" fontWeight="semibold">
            25+ Zufriedene Kunden
          </Text>
        </VStack>

       
      </VStack>
    </Section>
  );
}
