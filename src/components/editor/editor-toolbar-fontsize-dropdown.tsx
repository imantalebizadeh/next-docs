import { IconChevronDown } from "@tabler/icons-react";
import { type Editor, useEditorState } from "@tiptap/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { fontSizes } from "@/constants/editor-toolbar";

import { Button } from "../ui/button";

export function EditorToolbarFontSizeDropdown({
  editor,
}: {
  editor: Editor | null;
}) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      fontSize: ctx.editor?.getAttributes("textStyle").fontSize,
    }),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          title="Font Size"
          className="w-fit rounded-full"
        >
          {editorState?.fontSize?.replace("px", "") || "16"}
          <IconChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuLabel>Font Size</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {fontSizes.map(({ label, value }) => (
          <DropdownMenuItem
            key={label}
            onClick={() => editor?.chain().focus().setFontSize(value).run()}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
