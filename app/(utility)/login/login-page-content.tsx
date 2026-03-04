"use client";

import { Box, Button, VStack, AbsoluteCenter, Container, Text } from "@chakra-ui/react";
import { Link } from "@/components/ui/link";
import { useAuth } from "@/components/provider/auth-provider";
import { Login } from "@/components/auth/embed";

export function LoginPageContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box p="relative" h="100vh" w="100vw" bg="bg.muted">
        <AbsoluteCenter w="full" maxW="lg">
          <Container w="full">
            <Login />
          </Container>
        </AbsoluteCenter>
      </Box>
    );
  }

  if (user?.Account) {
    return (
      <Box p="relative" h="100vh" w="100vw" bg="bg.muted">
        <AbsoluteCenter w="full" maxW="md">
          <VStack gap={6} textAlign="center" px={4}>
            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.700" lineHeight="1.0">
              Du bist doch schon angemeldet...
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" lineHeight="1.0">
              Eigentlich hast du hier nichts zu suchen!
            </Text>
            <Link href="/app/free">
              <Button
                size="lg"
                colorPalette="green"
                fontWeight="bold"
                px={6}
                py={3}
                _hover={{ opacity: 0.9 }}
              >
                Zum kostenlosen Video-Kurs
              </Button>
            </Link>
          </VStack>
        </AbsoluteCenter>
      </Box>
    );
  }

  return (
    <Box p="relative" h="100vh" w="100vw" bg="bg.muted">
      <AbsoluteCenter w="full" maxW="lg">
        <Container w="full">
          <Login />
        </Container>
      </AbsoluteCenter>
    </Box>
  );
}
