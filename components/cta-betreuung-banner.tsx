"use client";

import { Box, Heading, Text, VStack, Button, HStack, Circle } from "@chakra-ui/react";
import { Link } from "@/components/ui/link";
import { ArrowRight, Star } from "@phosphor-icons/react";
import { Image } from "@/components/ui/image";
import { calConfig } from "@/config/cal-config";

const clientImages = [
  "/hero-funnel/clients/1765279404415.jpg",
  "/hero-funnel/clients/1767173817577.jpg",
  "/hero-funnel/clients/1768903210360.jpg",
  "/hero-funnel/clients/images.jpg",
  "/hero-funnel/clients/Screenshot%202026-03-03%20071433.png",
];

export function CtaBetreuungBanner() {
  return (
    <Box
      w="full"
      py={{ base: 8, md: 10 }}
      px={{ base: 4, md: 8 }}
      borderRadius="2xl"
      overflow="hidden"
      bg="linear-gradient(180deg, rgba(18, 18, 18, 1) 0%, rgba(34, 197, 94, 0.95) 20%, rgba(255, 255, 255, 1) 75%)"
      border="1.5px solid"
      borderColor="green.200"
      boxShadow="0 8px 32px rgba(34, 197, 94, 0.2)"
    >
      <VStack gap={{ base: 4, md: 5 }} textAlign="center" maxWidth="720px" mx="auto">
        {/* Badge – wie Hero */}
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
          Persönliche Begleitung
        </Box>

        {/* Überschrift – Hero-Style mit Bebas-Akzent */}
        <Heading
          as="h2"
          size={{ base: "xl", md: "2xl" }}
          fontWeight="extrabold"
          lineHeight={{ base: "0.95", md: "shorter" }}
          color="black"
        >
          Bereit für deine{" "}
          <Text
            as="span"
            className="bebas-neue-regular"
            color="white"
            textDecoration="underline"
            textDecorationColor="white"
            display="block"
            mt={{ base: "0.1em", md: "0.08em" }}
            fontSize={{ base: "1.35em", md: "1.3em" }}
            position="relative"
            zIndex={1}
          >
            VERÄNDERUNG
          </Text>
        </Heading>

        {/* Subline – Hero-Typo */}
        <Text
          fontSize={{ base: "md", md: "xl" }}
          fontWeight="semibold"
          lineHeight="shorter"
          color="gray.800"
        >
          Individueller Plan, wöchentliche Check-ins –{" "}
          <Text
            as="span"
            className="bebas-neue-regular"
            color="green"
            textDecoration="underline"
            textTransform="uppercase"
            fontSize={{ base: "1.1em", md: "1em" }}
          >
            maximale Ergebnisse
          </Text>{" "}
          in 16 Wochen.
        </Text>

        {/* CTA – gleicher Stil wie Hero-Button */}
        <Box mt={{ base: 2, md: 2 }} display="inline-block">
          <Link href={calConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
            <Button
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
              _hover={{ bg: "green.600" }}
              _active={{ transform: "scale(0.98)" }}
              transition="all 0.2s"
            >
              <HStack gap={2}>
                <Text>ES WIRD ZEIT!</Text>
                <ArrowRight size={20} weight="bold" />
              </HStack>
            </Button>
          </Link>
        </Box>

        {/* Social Proof – kompakt: Avatare + Sterne + Text in einer Zeile */}
        <HStack
          gap={{ base: 2, md: 3 }}
          justify="center"
          align="center"
          flexWrap="wrap"
          mt={{ base: 4, md: 3 }}
        >
          <HStack gap={{ base: -2, md: -2.5 }} flexShrink={0}>
            {clientImages.map((src, i) => (
              <Circle
                key={src}
                size={{ base: "28px", md: "32px" }}
                overflow="hidden"
                flexShrink={0}
                border="2px solid white"
                boxShadow="sm"
                position="relative"
                zIndex={clientImages.length - i}
              >
                <Image
                  src={src}
                  alt={`Kunde ${i + 1}`}
                  width={36}
                  height={36}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Circle>
            ))}
          </HStack>
          <HStack gap={0.5} flexShrink={0}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={14} color="var(--chakra-colors-yellow-400)" weight="fill" />
            ))}
          </HStack>
          <Text fontSize={{ base: "2xs", md: "xs" }} color="gray.800" fontWeight="semibold" whiteSpace="nowrap">
            25+ Zufriedene Kunden
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}
