"use client";

import {
  Center,
  Container,
  Box,
  HStack,
  Button,
} from "@chakra-ui/react";
import { Link } from "@/components/ui/link";
import { Image } from "@/components/ui/image";

export const FunnelNavbar = () => {
  return (
    <Center
      as="header"
      position="fixed"
      zIndex="docked"
      top={{ base: "4", sm: "6", md: "6" }}
      left="0"
      right="0"
      w="100vw"
      maxW="100vw"
      px={{ base: "4", md: "6" }}
      overflow="visible"
    >
      <Container maxW={{ base: "full", md: "1100px" }} w="full" px="0" mx="auto">
        <Box
          w="full"
          px={{ base: 3, sm: 4, md: 4 }}
          py={{ base: 2.5, sm: 3, md: 3 }}
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), 0 12px 40px rgba(0, 0, 0, 0.12), 0 24px 64px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.4) inset"
          background="rgba(255, 255, 255, 0.2)"
          backdropFilter="blur(20px) saturate(180%)"
          border="1px solid"
          borderColor="rgba(255, 255, 255, 0.35)"
          borderRadius="l3"
          overflow="visible"
        >
          <HStack
            w="full"
            justify="space-between"
            align="center"
            gap={{ base: 1, sm: 2, md: 3 }}
          >
            {/* Spacer links, damit Logo mittig bleibt */}
            <Box flexShrink={0} w={{ base: "72px", sm: "96px", md: "120px" }} />

            {/* Center: Logo */}
            <Center
              flex="1"
              h="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              minW="0"
            >
              <Link
                href="/Funnel"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src="/hero-funnel/logo/logo-pumpitclub.png"
                  alt="PumpItClub Logo"
                  width={200}
                  height={50}
                  style={{
                    height: "36px",
                    width: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </Link>
            </Center>

            {/* Right: Login Button */}
            <Box flexShrink={0} w={{ base: "72px", sm: "96px", md: "120px" }}>
              <Link href="/login">
                <Button
                  size={{ base: "md", sm: "lg", md: "xl" }}
                  px={{ base: 3, sm: 4, md: 5 }}
                  py={{ base: 2, sm: 2.5, md: 3 }}
                  fontSize={{ base: "sm", sm: "md", md: "lg" }}
                  borderRadius="lg"
                  bg="green.500"
                  color="white"
                  border="2px solid"
                  borderColor="green.600"
                  boxShadow="md"
                  transition="all 0.2s"
                  w="full"
                  _hover={{
                    bg: "green.600",
                    transform: "scale(1.05)",
                  }}
                  _active={{ transform: "scale(0.98)" }}
                  display="flex"
                  alignItems="center"
                  justifyContent={{ base: "center", sm: "flex-end" }}
                >
                  Login
                </Button>
              </Link>
            </Box>
          </HStack>
        </Box>
      </Container>
    </Center>
  );
};
