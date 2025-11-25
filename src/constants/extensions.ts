import { Highlight } from "@tiptap/extension-highlight";
import ImageKit from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TableKit } from "@tiptap/extension-table";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import type { Extensions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const extensions: Extensions = [
  StarterKit.configure({
    link: {
      autolink: false,
      defaultProtocol: "https",
    },
    // The Liveblocks extension comes with its own history handling
    undoRedo: false,
  }),
  TextStyleKit,
  TaskList,
  Highlight,
  TaskItem.configure({
    nested: true,
  }),
  TableKit.configure({
    table: { resizable: true },
  }),
  ImageKit.configure({
    resize: {
      enabled: true,
      alwaysPreserveAspectRatio: true,
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];
