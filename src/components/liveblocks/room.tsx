"use client";

import { type ReactNode, use } from "react";

import { LiveObject } from "@liveblocks/client";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";

import type { Id } from "../../../convex/_generated/dataModel";
import { getDocumentsByIds } from "@/data/documents";

export function Room({
  children,
  documentId,
  usersPromise,
}: {
  children: ReactNode;
  documentId: string;
  usersPromise: Promise<
    { id: string; email: string; name: string; avatar: string; color: string }[]
  >;
}) {
  const users = use(usersPromise);

  return (
    <LiveblocksProvider
      preventUnsavedChanges
      throttle={16}
      largeMessageStrategy="experimental-fallback-to-http"
      authEndpoint={async () => {
        const room = documentId;

        const response = await fetch("/api/liveblocks", {
          method: "POST",
          body: JSON.stringify({ room }),
        });

        return response.json();
      }}
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
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocumentsByIds(roomIds as Id<"documents">[]);
        return documents.map((document) => ({
          name: document.title,
          url: `/documents/${document._id}`,
        }));
      }}
    >
      <RoomProvider
        id={documentId}
        initialStorage={{
          documentMargins: new LiveObject({ left: 56, right: 56 }),
        }}
      >
        {children}
      </RoomProvider>
    </LiveblocksProvider>
  );
}
