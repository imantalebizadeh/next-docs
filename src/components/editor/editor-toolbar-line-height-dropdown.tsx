import { IconLineHeight } from "@tabler/icons-react";
import type { Editor } from "@tiptap/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { lineHeights } from "@/constants/editor-toolbar";

import { Button } from "../ui/button";

export function EditorToolbarLineHeightDropdown({
  editor,
}: {
  editor: Editor | null;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" title="Line Height">
          <IconLineHeight className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuLabel>Line Height</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {lineHeights.map(({ label, value }) => (
          <DropdownMenuItem
            key={label}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
