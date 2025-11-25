"use client";

import type { ReactNode } from "react";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";

export function Room({
  children,
  documentId,
}: {
  children: ReactNode;
  documentId: string;
}) {
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_1dOWzYtVvImSMhKZr-FgVEk6gFoXJuK-PpvszULfIveugDVUZjsY0HLTpHXdwjNr"
      }
    >
      <RoomProvider id={documentId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
