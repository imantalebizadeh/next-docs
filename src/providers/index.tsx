import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/sonner";

import { EditorStoreProvider } from "./editor-provider";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EditorStoreProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster />
      </ThemeProvider>
    </EditorStoreProvider>
  );
}
