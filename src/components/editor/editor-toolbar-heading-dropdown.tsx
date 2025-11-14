import { IconChevronDown } from "@tabler/icons-react";
import type { Level } from "@tiptap/extension-heading";
import { type Editor, useEditorState } from "@tiptap/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { headings } from "@/constants/editor-toolbar";

import { Button } from "../ui/button";

export function EditorToolbarHeadingDropdown({
  editor,
}: {
  editor: Editor | null;
}) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      heading: ctx.editor?.getAttributes("heading").level,
    }),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          title="Heading"
          className="w-fit rounded-full"
        >
          {editorState?.heading
            ? `Heading ${editorState.heading}`
            : "Paragraph"}
          <IconChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuLabel>Heading</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {headings.map(({ label, value }) => (
          <DropdownMenuItem
            key={label}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .setHeading({ level: value as Level })
                  .run();
              }
            }}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
