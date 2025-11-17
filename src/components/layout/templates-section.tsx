import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { templates } from "@/constants/templates";

export function TemplatesSection() {
  return (
    <section className="bg-muted py-6">
      <div className="mx-auto max-w-6xl space-y-4 px-4">
        <p>Start a new document</p>
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
                  <div className="space-y-2">
                    <Card className="cursor-pointer rounded-none shadow-none transition-colors hover:border-primary">
                      <CardContent>
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
                </CarouselItem>
              </Link>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
