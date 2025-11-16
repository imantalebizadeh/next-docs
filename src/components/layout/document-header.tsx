"use client";

import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconCloudCheck,
  IconEdit,
  IconFileExport,
  IconFileInvoice,
  IconPalette,
  IconPrinter,
  IconTable,
  IconTrash,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { useEditorStore } from "@/providers/editor-provider";

import { Logo } from "../logo";
import {
  Editable,
  EditableArea,
  EditableInput,
  EditablePreview,
} from "../ui/editable";

export function DocumentHeader() {
  const editor = useEditorStore((store) => store.editor);
  const { theme, setTheme } = useTheme();

  function InsertTable(rows: number, cols: number) {
    if (!editor) {
      return;
    }

    editor.chain().focus().insertTable({ rows, cols }).run();
  }

  return (
    <header className="flex items-center gap-2 bg-background p-2">
      {/* App Logo */}
      <Logo className="size-12" />
      <div className="flex flex-col">
        {/* Document name */}
        <div className="flex items-center gap-2">
          <Editable
            defaultValue="Untitled Document"
            placeholder="Enter the document name here"
            triggerMode="click"
            autosize
          >
            <EditableArea>
              <EditablePreview className="p-0 font-medium text-[17px]" />
              <EditableInput className="p-0 font-medium text-[17px]" />
            </EditableArea>
          </Editable>
          {/* Sync status */}
          <IconCloudCheck className="size-4 text-muted-foreground" />
        </div>
        {/* Menu bar */}
        <Menubar className="-ml-2 h-8 border-none p-px shadow-none">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <IconFileInvoice />
                New Document
              </MenubarItem>
              <MenubarSub>
                <MenubarSubTrigger className="gap-2">
                  <IconFileExport className="size-4 text-muted-foreground" />
                  Export
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Pdf</MenubarItem>
                  <MenubarItem>Word</MenubarItem>
                  <MenubarItem>Text</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>
                <IconEdit />
                Rename
              </MenubarItem>
              <MenubarItem>
                <IconPrinter />
                Print <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger className="gap-2">
                  <IconPalette className="size-4 text-muted-foreground" />
                  Theme
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarRadioGroup
                    value={theme}
                    onValueChange={(value) => setTheme(value)}
                  >
                    <MenubarRadioItem value="light">Light</MenubarRadioItem>
                    <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
                    <MenubarRadioItem value="system">System</MenubarRadioItem>
                  </MenubarRadioGroup>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarItem variant="destructive">
                <IconTrash />
                Delete
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                <IconArrowBackUp />
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                <IconArrowForwardUp />
                Redo <MenubarShortcut>⌘Y</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Insert</MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger className="gap-2">
                  <IconTable className="size-4 text-muted-foreground" />
                  Table
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem onClick={() => InsertTable(1, 1)}>
                    1 x 1
                  </MenubarItem>
                  <MenubarItem onClick={() => InsertTable(2, 2)}>
                    2 x 2
                  </MenubarItem>
                  <MenubarItem onClick={() => InsertTable(3, 3)}>
                    3 x 3
                  </MenubarItem>
                  <MenubarItem onClick={() => InsertTable(4, 4)}>
                    4 x 4
                  </MenubarItem>
                  <MenubarItem onClick={() => InsertTable(5, 5)}>
                    5 x 5
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </header>
  );
}
