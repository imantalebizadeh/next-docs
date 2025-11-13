import type { Metadata } from "next";

import { Editor } from "@/components/editor";

export const metadata: Metadata = {
  title: "Document",
};

export default async function DocumentPage({
  params,
}: PageProps<"/documents/[documentId]">) {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-muted">
      <h1 className="font-bold text-2xl">Document {documentId}</h1>
      <Editor />
    </div>
  );
}
