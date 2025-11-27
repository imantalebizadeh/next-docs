"use client";

import { use, type ReactNode } from "react";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";

import { DocumentSkeleton } from "@/components/documents/document-skeleton";

export function Room({
  children,
  documentId,
  usersPromise,
}: {
  children: ReactNode;
  documentId: string;
  usersPromise: Promise<
    { id: string; email: string; name: string; avatar: string }[]
  >;
}) {
  const users = use(usersPromise);

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks"
      // biome-ignore lint/nursery/useConsistentArrowReturn: return statement is needed for better readability
      resolveUsers={({ userIds }) => {
        return (
          userIds.map((userId) => users.find((user) => user.id === userId)) ??
          undefined
        );
      }}
      resolveMentionSuggestions={({ text }) => {
        if (text) {
          return users
            .filter((user) =>
              user.name.toLowerCase().includes(text.toLowerCase())
            )
            .map((user) => user.id);
        }

        return users.map((user) => user.id);
      }}
    >
      <RoomProvider id={documentId}>
        <ClientSideSuspense fallback={<DocumentSkeleton />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
