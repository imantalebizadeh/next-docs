import { type Editor, useEditorState } from "@tiptap/react";
import { ChevronDownIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { fontFamilies } from "@/constants/editor-toolbar";

import { Button } from "../ui/button";

export function EditorToolbarFontFamilyDropdown({
  editor,
}: {
  editor: Editor | null;
}) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      fontFamily: ctx.editor?.getAttributes("textStyle").fontFamily,
    }),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          title="Font Family"
          className="w-fit rounded-full"
        >
          {editorState?.fontFamily || "Arial"}
          <ChevronDownIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>Font Family</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {fontFamilies.map(({ label, value, className }) => (
          <DropdownMenuItem
            key={label}
            className={className}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
