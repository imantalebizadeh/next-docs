import { Skeleton } from "@/components/ui/skeleton";

export function DocumentSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar skeleton */}
      <div className="flex items-center gap-1 border-border border-t border-b bg-background px-4 py-1.5 lg:justify-center">
        {/* Undo/Redo/Print group */}
        <div className="flex items-center gap-0.5">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
        </div>

        <div className="mx-1.5 h-8 w-px bg-border" />

        {/* Font dropdowns group */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-28 rounded-md" />
          <Skeleton className="h-8 w-14 rounded-md" />
        </div>

        <div className="mx-1.5 h-8 w-px bg-border" />

        {/* Text formatting group */}
        <div className="flex items-center gap-0.5">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
        </div>

        <div className="mx-1.5 h-8 w-px bg-border" />

        {/* Links and media group */}
        <div className="flex items-center gap-0.5">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
        </div>

        <div className="mx-1.5 h-8 w-px bg-border" />

        {/* Alignment group */}
        <div className="flex items-center gap-0.5">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
        </div>

        <div className="mx-1.5 h-8 w-px bg-border" />

        {/* Lists group */}
        <div className="flex items-center gap-0.5">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
        </div>

        <div className="mx-1.5 h-8 w-px bg-border" />

        <Skeleton className="size-8 rounded-md" />
      </div>

      {/* Ruler skeleton */}
      <div className="border-border border-b">
        <div className="mx-auto h-6 max-w-4xl">
          <Skeleton className="h-full w-full rounded-none" />
        </div>
      </div>

      {/* Document skeleton */}
      <div className="relative mx-auto mb-4 min-h-0 w-full max-w-4xl flex-1 px-2 lg:px-0">
        <div className="min-h-svh rounded border border-border bg-background px-14 py-14">
          {/* Document title skeleton */}
          <Skeleton className="mb-8 h-9 w-3/4" />

          {/* Document content lines - simulating paragraphs */}
          <div className="space-y-6">
            {/* First paragraph */}
            <div className="space-y-2.5">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[92%]" />
              <Skeleton className="h-4 w-[88%]" />
            </div>

            {/* Second paragraph */}
            <div className="space-y-2.5">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[95%]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[78%]" />
            </div>

            {/* Subheading */}
            <Skeleton className="mt-4 h-6 w-1/2" />

            {/* Third paragraph */}
            <div className="space-y-2.5">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[97%]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[85%]" />
              <Skeleton className="h-4 w-[60%]" />
            </div>

            {/* List items simulation */}
            <div className="space-y-2.5 pl-6">
              <div className="flex items-center gap-3">
                <Skeleton className="size-2 shrink-0 rounded-full" />
                <Skeleton className="h-4 w-[75%]" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="size-2 shrink-0 rounded-full" />
                <Skeleton className="h-4 w-[82%]" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="size-2 shrink-0 rounded-full" />
                <Skeleton className="h-4 w-[68%]" />
              </div>
            </div>

            {/* Fourth paragraph */}
            <div className="space-y-2.5">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[45%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
