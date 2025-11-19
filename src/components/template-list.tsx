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
      <CarouselContent className="w-44">
        {templates.map((template) => (
          <CarouselItem key={template.id}>
            <TemplateItem template={template} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
