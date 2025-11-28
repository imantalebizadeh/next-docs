import type { Metadata } from "next";

import { Editor } from "@/components/editor";
import { DocumentHeader } from "@/components/layout/document-header";
import { Room } from "@/components/liveblocks/room";

import { getUsers } from "@/data/users";

export const metadata: Metadata = {
  title: "Document",
};

export default async function DocumentPage({
  params,
}: PageProps<"/documents/[documentId]">) {
  const { documentId } = await params;
  const usersPromise = getUsers();

  return (
    <Room documentId={documentId} usersPromise={usersPromise}>
      <div className="min-h-screen bg-muted">
        <DocumentHeader />
        <Editor />
      </div>
    </Room>
  );
}
