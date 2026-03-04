"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FunnelNavbar } from "@/components/layout/funnel-navbar";
import { FunnelFooter } from "@/components/layout/funnel-footer";
import { Box } from "@chakra-ui/react";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFunnelRoot = pathname === "/" || pathname?.startsWith("/Funnel");
  const isLegalPage = pathname?.startsWith("/legal");



  return (
    <>
      <FunnelNavbar />
        <Box as="main" overflowX="hidden" maxW="100vw">{children}</Box>
        <FunnelFooter />
    </>
  );
}
