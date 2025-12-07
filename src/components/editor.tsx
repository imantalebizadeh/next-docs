"use client";

import { type ComponentRef, useEffect, useRef, useState } from "react";

import { LiveObject } from "@liveblocks/client";
import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { EditorContent, useEditor } from "@tiptap/react";
import { type Preloaded, usePreloadedQuery } from "convex/react";

import { Threads } from "@/components/liveblocks/threads";

import { extensions } from "@/constants/extensions";

import { useEditorStore } from "@/providers/editor-provider";

import type { api } from "../../convex/_generated/api";
import { EditorRuler } from "./editor-ruler";
import { EditorToolbar } from "./editor-toolbar";

export function Editor({
  preloadedDocument,
}: {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}) {
  const document = usePreloadedQuery(preloadedDocument);

  const liveblocks = useLiveblocksExtension({
    initialContent: document.content,
    offlineSupport_experimental: true,
  });

  const setLeftMargin = useMutation(({ storage }, margin: number) => {
    storage.set(
      "documentMargins",
      new LiveObject({
        left: margin,
        right: storage.get("documentMargins").get("right"),
      })
    );
  }, []);

  const setRightMargin = useMutation(({ storage }, margin: number) => {
    storage.set(
      "documentMargins",
      new LiveObject({
        left: storage.get("documentMargins").get("left"),
        right: margin,
      })
    );
  }, []);

  const margins = useStorage((root) => root.documentMargins);

  const containerRef = useRef<ComponentRef<typeof EditorContent>>(null);
  const [containerWidth, setContainerWidth] = useState<number | undefined>(
    undefined
  );
  const [guideLineMargin, setGuideLineMargin] = useState<number | null>(null);
  const [guideLineSide, setGuideLineSide] = useState<"left" | "right" | null>(
    null
  );
  const [guideLinePosition, setGuideLinePosition] = useState<number | null>(
    null
  );
  const [guideLineBounds, setGuideLineBounds] = useState<{
    top: number;
    bottom: number;
  } | null>(null);

  const setEditor = useEditorStore((store) => store.setEditor);

  const editor = useEditor({
    content: "Hello World",
    extensions: [...extensions, liveblocks],
    editorProps: {
      attributes: {
        class:
          "focus:outline-none w-full mx-auto font-[Arial] max-w-4xl print:max-w-none focus-visible:outline-none border border-border py-14 min-h-svh bg-background prose prose-sm sm:prose-base",
      },
    },
    immediatelyRender: false,
    autofocus: true,
    onCreate: (props) => {
      setEditor(props.editor);
    },
    onUpdate: (props) => {
      setEditor(props.editor);
    },
    onTransaction: (props) => {
      setEditor(props.editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
  });

  // Update container width when it changes
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const updateWidth = () => {
      if (containerRef.current) {
        const width = editor?.view.dom.offsetWidth;
        setContainerWidth(width);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [editor?.view.dom.offsetWidth]);

  // Update editor padding when margins change
  useEffect(() => {
    if (!editor?.view?.dom) {
      return;
    }

    const editorElement = editor.view.dom as HTMLElement;
    editorElement.style.paddingLeft = `${margins.left}px`;
    editorElement.style.paddingRight = `${margins.right}px`;
  }, [editor, margins.left, margins.right]);

  // Update guide line position when dragging
  useEffect(() => {
    if (
      guideLineMargin === null ||
      !guideLineSide ||
      !editor?.view?.dom ||
      !containerWidth
    ) {
      setGuideLinePosition(null);
      setGuideLineBounds(null);
      return;
    }

    const updateGuideLinePosition = () => {
      const editorElement = editor.view.dom as HTMLElement;
      const rect = editorElement.getBoundingClientRect();

      // Set bounds to only show guide line over the document
      setGuideLineBounds({
        top: rect.top,
        bottom: rect.bottom,
      });

      // Calculate position aligned with center of drag handler
      // Left handler: positioned at leftMargin, has w-0.5 (2px), so center is at leftMargin + 1px
      // Right handler: positioned at rightMargin from right, has w-0.5 (2px), so center is at rightMargin + 1px from right
      // Guide line is w-px (1px), so we center it by offsetting by 0.5px
      if (guideLineSide === "left") {
        setGuideLinePosition(rect.left + guideLineMargin + 1 - 0.5);
      } else {
        setGuideLinePosition(rect.right - guideLineMargin - 1 - 0.5);
      }
    };

    updateGuideLinePosition();
    window.addEventListener("resize", updateGuideLinePosition);
    window.addEventListener("scroll", updateGuideLinePosition, true);

    return () => {
      window.removeEventListener("resize", updateGuideLinePosition);
      window.removeEventListener("scroll", updateGuideLinePosition, true);
    };
  }, [guideLineMargin, guideLineSide, editor?.view?.dom, containerWidth]);

  return (
    <div className="flex flex-col gap-4">
      <EditorToolbar editor={editor} />
      <div className="border-border border-b print:hidden">
        <EditorRuler
          leftMargin={margins.left}
          rightMargin={margins.right}
          onLeftMarginChange={setLeftMargin}
          onRightMarginChange={setRightMargin}
          containerWidth={containerWidth}
          onGuideLineChange={(margin, side) => {
            setGuideLineMargin(margin);
            setGuideLineSide(side);
          }}
        />
      </div>
      <div className="relative mb-4 min-h-0 flex-1 px-2 lg:px-0">
        <EditorContent ref={containerRef} editor={editor} />
        <Threads editor={editor} />
        {guideLinePosition !== null && guideLineBounds && (
          <div
            className="pointer-events-none fixed z-50 w-px bg-primary/60"
            style={{
              left: `${guideLinePosition}px`,
              top: `${guideLineBounds.top}px`,
              height: `${guideLineBounds.bottom - guideLineBounds.top}px`,
            }}
          />
        )}
      </div>
    </div>
  );
}
