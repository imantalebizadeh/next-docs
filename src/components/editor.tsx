"use client";

import { EditorContent, useEditor } from "@tiptap/react";

import { extensions } from "@/constants/extensions";

import { EditorToolbar } from "./editor-toolbar";

export function Editor() {
  const editor = useEditor({
    content: "Hello World",
    extensions,
    editorProps: {
      attributes: {
        class:
          "focus:outline-none w-full mx-auto font-[Arial] max-w-4xl print:max-w-none print:p-0 focus-visible:outline-none border border-border py-14 px-14 min-h-svh bg-background prose prose-sm sm:prose-base",
      },
    },
    immediatelyRender: false,
    autofocus: true,
  });

  return (
    <div className="flex flex-col gap-4">
      <EditorToolbar editor={editor} />
      <div className="min-h-0 flex-1 p-4 lg:p-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
