import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

import type { Template } from "@/constants/templates";

export function TemplateItem({ template }: { template: Template }) {
  return (
    <div className="space-y-2">
      <Card className="cursor-pointer rounded-none py-0 shadow-none transition-colors hover:border-primary">
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
