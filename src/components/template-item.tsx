"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useMutation } from "convex/react";

import { Card, CardContent } from "@/components/ui/card";

import type { Template } from "@/constants/templates";

import { api } from "../../convex/_generated/api";

export function TemplateItem({ template }: { template: Template }) {
  const router = useRouter();
  const createDocument = useMutation(api.documents.create);

  const handleCreateDocument = async () => {
    const documentId = await createDocument({
      title: template.title,
      content: template.initialContent,
    });
    router.push(`/documents/${documentId}`);
  };

  return (
    <div className="space-y-2">
      <Card
        className="cursor-pointer rounded-none py-0 shadow-none transition-colors hover:border-primary"
        onClick={handleCreateDocument}
      >
        <CardContent className="px-0">
          <Image
            src={template.image}
            alt={template.title}
            width={100}
            height={100}
            priority
            className="size-full object-cover"
          />
        </CardContent>
      </Card>
      <span className="text-xs sm:text-sm">{template.title}</span>
    </div>
  );
}
