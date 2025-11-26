"use client";

import type { ReactNode } from "react";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";

import { DocumentSkeleton } from "@/components/documents/document-skeleton";

export function Room({
  children,
  documentId,
}: {
  children: ReactNode;
  documentId: string;
}) {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks">
      <RoomProvider id={documentId}>
        <ClientSideSuspense fallback={<DocumentSkeleton />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
