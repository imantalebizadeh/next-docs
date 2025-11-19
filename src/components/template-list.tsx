import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import type { Template } from "@/constants/templates";

import { TemplateItem } from "./template-item";

export function TemplateList({ templates }: { templates: Template[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-6xl"
    >
      <CarouselContent>
        {templates.map((template) => (
          <Link href={`/documents/${template.id}`} key={template.id}>
            <CarouselItem className="w-44">
              <TemplateItem template={template} />
            </CarouselItem>
          </Link>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
