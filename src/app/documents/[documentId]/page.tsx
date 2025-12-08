import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchQuery, preloadQuery } from "convex/nextjs";

import { DocumentSkeleton } from "@/components/documents/document-skeleton";
import { Editor } from "@/components/editor";
import { DocumentHeader } from "@/components/layout/document-header";
import { Room } from "@/components/liveblocks/room";
import { ClientSideSuspense } from "@/components/liveblocks/suspense-wrapper";

import { getAuthToken } from "@/lib/auth";

import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { getUsers } from "@/data/users";

export async function generateMetadata({
  params,
}: PageProps<"/documents/[documentId]">): Promise<Metadata> {
  const { documentId } = await params;

  const document = await fetchQuery(api.documents.getById, {
    documentId: documentId as Id<"documents">,
  });

  return {
    title: document.title,
  };
}

export default async function DocumentPage({
  params,
}: PageProps<"/documents/[documentId]">) {
  const { documentId } = await params;

  const usersPromise = getUsers();

  const token = await getAuthToken();
  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    { documentId: documentId as Id<"documents"> },
    { token }
  );

  if (!preloadedDocument) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-muted">
      <Room documentId={documentId} usersPromise={usersPromise}>
        <DocumentHeader preloadedDocument={preloadedDocument} />
        <ClientSideSuspense fallback={<DocumentSkeleton />}>
          <Editor preloadedDocument={preloadedDocument} />
        </ClientSideSuspense>
      </Room>
    </div>
  );
}
