"use client";

import type { ReactNode } from "react";

import { ClientSideSuspense as LiveblocksClientSideSuspense } from "@liveblocks/react/suspense";

export function ClientSideSuspense({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactNode;
}) {
  return (
    <LiveblocksClientSideSuspense fallback={fallback}>
      {children}
    </LiveblocksClientSideSuspense>
  );
}
