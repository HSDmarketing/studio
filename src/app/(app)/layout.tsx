"use client"; // This layout can be a client component if it needs hooks like usePathname for title

import { AppLayout } from "@/components/layout/app-layout";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Helper to derive a title from the pathname
function generateTitleFromPathname(pathname: string): string {
  if (pathname === "/dashboard") return "Dashboard";
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0) {
    const lastSegment = segments[segments.length -1];
    // Capitalize first letter and replace dashes with spaces
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ');
  }
  return "ReplyDo";
}


export default function AuthenticatedAppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const pageTitle = generateTitleFromPathname(pathname);
  
  return <AppLayout pageTitle={pageTitle}>{children}</AppLayout>;
}
