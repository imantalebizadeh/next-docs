import { Highlight } from "@tiptap/extension-highlight";
import ImageKit from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TableKit } from "@tiptap/extension-table";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import type { Extensions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const extensions: Extensions = [
  StarterKit,
  TextStyleKit,
  TaskList,
  Highlight,
  Link.configure({
    defaultProtocol: "https",
    autolink: false,
  }),
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
