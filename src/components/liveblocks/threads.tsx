import { useThreads } from "@liveblocks/react";
import {
  AnchoredThreads,
  FloatingComposer,
  FloatingThreads,
} from "@liveblocks/react-tiptap";
import { IconAlertCircle } from "@tabler/icons-react";
import type { Editor } from "@tiptap/react";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export function Threads({ editor }: { editor: Editor | null }) {
  const { threads, isLoading, error } = useThreads({
    query: { resolved: false },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <IconAlertCircle className="size-4" />
        <AlertTitle>Error loading threads.</AlertTitle>
        <AlertDescription>
          <p>{error.message}</p>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className="absolute right-[12px] block w-full max-w-[300px] sm:hidden">
        <AnchoredThreads editor={editor} threads={threads} />
      </div>
      <FloatingThreads
        editor={editor}
        threads={threads}
        className="hidden sm:block"
      />
      <FloatingComposer editor={editor} className="floating-composer" />
    </>
  );
}
