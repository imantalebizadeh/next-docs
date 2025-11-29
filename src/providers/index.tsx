"use client";

import type { ReactNode } from "react";

import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/sonner";

import { ConvexReactQueryProvider } from "./convex-react-query-provider";
import { EditorStoreProvider } from "./editor-provider";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider appearance={{ theme: shadcn }}>
      <ConvexReactQueryProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <EditorStoreProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </EditorStoreProvider>
          <Toaster />
        </ThemeProvider>
      </ConvexReactQueryProvider>
    </ClerkProvider>
  );
}
