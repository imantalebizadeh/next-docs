import type { Metadata } from "next";

import { Editor } from "@/components/editor";
import { DocumentHeader } from "@/components/layout/document-header";

export const metadata: Metadata = {
  title: "Document",
};

export default async function DocumentPage({
  params,
}: PageProps<"/documents/[documentId]">) {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-muted">
      <DocumentHeader />
      <Editor />
    </div>
  );
}
