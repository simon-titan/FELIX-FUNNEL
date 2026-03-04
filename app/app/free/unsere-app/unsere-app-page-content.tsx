"use client";

import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { AppFeaturesSection } from "@/sections/handyapp/app-features-section";
import { AppFeaturesVisualSection } from "@/sections/handyapp/app-features-visual-section";
import { AppFaqSection } from "@/sections/handyapp/app-faq-section";
import { AppDownloadSection } from "@/sections/handyapp/app-download-section";

export function UnsereAppPageContent() {
  return (
    <Box
      w="full"
      minH="100vh"
      bg="gray.50"
      borderTopWidth="1px"
      borderColor="gray.200"
    >
      {/* Page Header */}
      <Section size="md">
        <VStack
          gap={{ base: 2, md: 3 }}
          align="center"
          textAlign="center"
          maxW="2xl"
          mx="auto"
        >
          <Text
            fontSize="xs"
            fontWeight="600"
            color="green.600"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Unsere App
          </Text>
          <Heading
            size="xl"
            color="gray.800"
            fontWeight="700"
            letterSpacing="tighter"
          >
            Pump It Club App
          </Heading>
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="gray.600"
            lineHeight="tall"
          >
            Alles was du für deinen Traumkörper benötigst – übersichtlich in einer App. Training, Ernährung und Fortschritt an einem Ort.
          </Text>
        </VStack>
      </Section>

      {/* Features – Was die App kann */}
      <Box bg="white" borderTopWidth="1px" borderColor="gray.200">
        <AppFeaturesSection />
      </Box>

      {/* Visual / Mockups */}
      <AppFeaturesVisualSection />

      {/* FAQ */}
      <Box bg="white" borderTopWidth="1px" borderColor="gray.200">
        <AppFaqSection />
      </Box>

      {/* Download CTA */}
      <Box
        bg="green.50"
        borderTopWidth="1px"
        borderColor="green.200"
      >
        <AppDownloadSection />
      </Box>
    </Box>
  );
}
