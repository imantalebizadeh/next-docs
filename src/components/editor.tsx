"use client";

import ImageKit from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TableKit } from "@tiptap/extension-table";
import { Dropcursor } from "@tiptap/extensions";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
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
      Dropcursor,
    ],
    content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
    editorProps: {
      attributes: {
        class:
          "focus:outline-none w-full focus-visible:outline-none border border-border py-14 px-14 min-h-svh bg-background prose prose-sm sm:prose-base max-w-none",
      },
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    // Autofocus the editor when it is mounted
    autofocus: true,
  });

  return (
    <div className="mx-auto w-full max-w-4xl p-4 print:max-w-none print:p-0">
      <EditorContent editor={editor} />
    </div>
  );
}
