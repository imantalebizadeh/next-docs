import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { cn } from "@/lib/utils";

import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Google Docs Clone",
  description: "A clone of Google Docs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "flex min-h-screen flex-col antialiased"
        )}
      >
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
