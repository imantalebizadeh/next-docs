import { useEffect, useState } from "react";

import type { Level } from "@tiptap/extension-heading";
import { type Editor, useEditorState } from "@tiptap/react";
import type { LucideIcon } from "lucide-react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BaselineIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  MessageCircleMoreIcon,
  PaintBucketIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

import {
  ColorPicker,
  ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerEyeDropper,
  ColorPickerFormatSelect,
  ColorPickerHueSlider,
  ColorPickerInput,
} from "@/components/ui/color-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { fontFamilies, fontSizes, headings } from "@/constants/editor-toolbar";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Toggle } from "./ui/toggle";

// Button component for the editor toolbar
function EditorToolbarButton({
  icon,
  label,
  onClick,
}: {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}) {
  const IconComponent = icon;
  return (
    <Button variant="ghost" size="icon-sm" title={label} onClick={onClick}>
      <IconComponent />
      <span className="sr-only">{label}</span>
    </Button>
  );
}

// Toggle component for the editor toolbar
function EditorToolbarToggle({
  icon,
  label,
  onClick,
}: {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}) {
  const IconComponent = icon;
  return (
    <Toggle variant="default" size="sm" title={label} onClick={onClick}>
      <IconComponent />
      <span className="sr-only">{label}</span>
    </Toggle>
  );
}

// Heading Dropdown component for the editor toolbar
function EditorToolbarHeadingDropdown({ editor }: { editor: Editor | null }) {
  const [activeHeading, setActiveHeading] = useState<string>("Paragraph");

  useEffect(() => {
    if (!editor) {
      return;
    }

    const updateActiveHeading = () => {
      const headingAttrs = editor.getAttributes("heading");
      if (headingAttrs.level) {
        const heading = headings.find((h) => h.value === headingAttrs.level);
        setActiveHeading(heading?.label || "Heading");
        return;
      }

      const isParagraph = editor.isActive("paragraph");
      if (isParagraph) {
        const paragraphHeading = headings.find((h) => h.value === 0);
        setActiveHeading(paragraphHeading?.label || "Paragraph");
      } else {
        setActiveHeading("Paragraph");
      }
    };

    // Update on editor changes
    editor.on("update", updateActiveHeading);
    editor.on("selectionUpdate", updateActiveHeading);

    // Initial update
    updateActiveHeading();

    return () => {
      editor.off("update", updateActiveHeading);
      editor.off("selectionUpdate", updateActiveHeading);
    };
  }, [editor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          title="Heading"
          className="w-fit rounded-full"
        >
          {activeHeading}
          <ChevronDownIcon className="size-4" />
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

// Font Family Dropdown component for the editor toolbar
function EditorToolbarFontFamilyDropdown({
  editor,
}: {
  editor: Editor | null;
}) {
  const [activeFontFamily, setActiveFontFamily] = useState<string>("Arial");

  useEffect(() => {
    if (!editor) {
      return;
    }

    const updateActiveFontFamily = () => {
      const fontFamilyAttrs = editor.getAttributes("textStyle");
      if (fontFamilyAttrs.fontFamily) {
        const fontFamily = fontFamilies.find(
          (f) => f.value === fontFamilyAttrs.fontFamily
        );
        setActiveFontFamily(fontFamily?.label || "Font Family");
      } else {
        setActiveFontFamily("Arial");
      }
    };

    // Update on editor changes
    editor.on("update", updateActiveFontFamily);
    editor.on("selectionUpdate", updateActiveFontFamily);

    // Initial update
    updateActiveFontFamily();

    return () => {
      editor.off("update", updateActiveFontFamily);
      editor.off("selectionUpdate", updateActiveFontFamily);
    };
  }, [editor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          title="Font Family"
          className="w-fit rounded-full"
        >
          {activeFontFamily}
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

// Font Size Dropdown component for the editor toolbar
function EditorToolbarFontSizeDropdown({ editor }: { editor: Editor | null }) {
  const [activeFontSize, setActiveFontSize] = useState<string>("16");

  useEffect(() => {
    if (!editor) {
      return;
    }

    const updateActiveFontSize = () => {
      const fontFamilyAttrs = editor.getAttributes("textStyle");
      if (fontFamilyAttrs.fontSize) {
        const fontSize = fontSizes.find(
          (f) => f.value === fontFamilyAttrs.fontSize
        );
        setActiveFontSize(fontSize?.label || "16");
      } else {
        setActiveFontSize("16");
      }
    };

    // Update on editor changes
    editor.on("update", updateActiveFontSize);
    editor.on("selectionUpdate", updateActiveFontSize);

    // Initial update
    updateActiveFontSize();

    return () => {
      editor.off("update", updateActiveFontSize);
      editor.off("selectionUpdate", updateActiveFontSize);
    };
  }, [editor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          title="Font Size"
          className="w-fit rounded-full"
        >
          {activeFontSize}
          <ChevronDownIcon className="size-4" />
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

// Color Picker component for the editor toolbar
function EditorToolbarColorPicker({
  value,
  onValueChange,
  icon,
}: {
  value: string;
  onValueChange: (color: string) => void;
  icon: LucideIcon;
}) {
  const IconComponent = icon;

  return (
    <ColorPicker
      value={value}
      onValueChange={onValueChange}
      inline
      defaultFormat="hex"
    >
      <Popover modal>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon-sm" title="Text Color">
            <IconComponent style={{ color: value }} />
            <span className="sr-only">Text Color</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <div className="flex flex-col gap-4 rounded-lg border p-4">
            <ColorPickerArea />
            <div className="flex items-center gap-2">
              <ColorPickerEyeDropper />
              <div className="flex flex-1 flex-col gap-2">
                <ColorPickerHueSlider />
                <ColorPickerAlphaSlider />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ColorPickerFormatSelect />
              <ColorPickerInput />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </ColorPicker>
  );
}

export function EditorToolbar({ editor }: { editor: Editor | null }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      color: ctx.editor?.getAttributes("textStyle").color || "#0a0a0a",
      backgroundColor:
        ctx.editor?.getAttributes("textStyle").backgroundColor || "#ffffff",
    }),
  });

  return (
    <div className="flex items-center gap-px overflow-x-auto border-border border-t border-b bg-background px-4 py-1 lg:justify-center print:hidden">
      {/* Undo */}
      <EditorToolbarButton
        icon={Undo2Icon}
        label="Undo"
        onClick={() => editor?.chain().focus().undo().run()}
      />

      {/* Redo */}
      <EditorToolbarButton
        icon={Redo2Icon}
        label="Redo"
        onClick={() => editor?.chain().focus().redo().run()}
      />

      {/* Print */}
      <EditorToolbarButton
        icon={PrinterIcon}
        label="Print"
        onClick={() => window.print()}
      />

      {/* Remove Formatting */}
      <EditorToolbarButton
        icon={RemoveFormattingIcon}
        label="Remove Formatting"
        onClick={() => editor?.chain().focus().unsetAllMarks().run()}
      />

      {/* Font Family and Size Dropdown */}
      <section className="flex items-center gap-1">
        {/* Heading Dropdown */}
        <EditorToolbarHeadingDropdown editor={editor} />

        {/* Font Family Dropdown */}
        <EditorToolbarFontFamilyDropdown editor={editor} />

        {/* Font Size Dropdown */}
        <EditorToolbarFontSizeDropdown editor={editor} />
      </section>

      {/* Separator */}
      <Separator
        className="mx-1 data-[orientation=vertical]:h-8"
        orientation="vertical"
      />

      {/* Bold Toggle */}
      <EditorToolbarToggle
        icon={BoldIcon}
        label="Bold"
        onClick={() => editor?.chain().focus().toggleBold().run()}
      />

      {/* Italic Toggle */}
      <EditorToolbarToggle
        icon={ItalicIcon}
        label="Italic"
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      />

      {/* Underline Toggle */}
      <EditorToolbarToggle
        icon={UnderlineIcon}
        label="Underline"
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      />

      {/* Strikethrough Toggle */}
      <EditorToolbarToggle
        icon={StrikethroughIcon}
        label="Strikethrough"
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      />

      {/* Text Color Picker */}
      <EditorToolbarColorPicker
        value={editorState?.color}
        onValueChange={(color) => editor?.chain().focus().setColor(color).run()}
        icon={BaselineIcon}
      />

      {/* Background Color Picker */}
      <EditorToolbarColorPicker
        value={editorState?.backgroundColor}
        onValueChange={(color) =>
          editor?.chain().focus().setBackgroundColor(color).run()
        }
        icon={PaintBucketIcon}
      />

      {/* Highlight Color Picker */}
      <EditorToolbarToggle
        icon={HighlighterIcon}
        label="Highlight"
        onClick={() => editor?.chain().focus().toggleHighlight().run()}
      />

      {/* Separator */}
      <Separator
        className="mx-1 data-[orientation=vertical]:h-8"
        orientation="vertical"
      />

      {/* Link Button */}
      <EditorToolbarButton
        icon={LinkIcon}
        label="Link"
        onClick={() => editor?.chain().focus().toggleLink().run()}
      />

      {/* Add Comment Button */}
      <EditorToolbarButton
        icon={MessageCircleMoreIcon}
        label="Add Comment"
        onClick={() => {
          // TODO: Add comment
          console.log("Add Comment");
        }}
      />

      {/* Add Image Button */}
      <EditorToolbarButton
        icon={ImageIcon}
        label="Add Image"
        onClick={() => {
          // TODO: Add image
          console.log("Add Image");
        }}
      />

      {/* Separator */}
      <Separator
        className="mx-1 data-[orientation=vertical]:h-8"
        orientation="vertical"
      />

      {/* Align Left Button */}
      <EditorToolbarButton
        icon={AlignLeftIcon}
        label="Align Left"
        onClick={() => editor?.chain().focus().setTextAlign("left").run()}
      />

      {/* Align Center Button */}
      <EditorToolbarButton
        icon={AlignCenterIcon}
        label="Align Center"
        onClick={() => editor?.chain().focus().setTextAlign("center").run()}
      />

      {/* Align Right Button */}
      <EditorToolbarButton
        icon={AlignRightIcon}
        label="Align Right"
        onClick={() => editor?.chain().focus().setTextAlign("right").run()}
      />

      {/* Align Justify Button */}
      <EditorToolbarButton
        icon={AlignJustifyIcon}
        label="Align Justify"
        onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
      />

      {/* Separator */}
      <Separator
        className="mx-1 data-[orientation=vertical]:h-8"
        orientation="vertical"
      />

      {/* Unordered List Button */}
      <EditorToolbarButton
        icon={ListIcon}
        label="Unordered List"
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      />

      {/* Ordered List Button */}
      <EditorToolbarButton
        icon={ListOrderedIcon}
        label="Ordered List"
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      />

      {/* Task List Button */}
      <EditorToolbarButton
        icon={ListTodoIcon}
        label="Task List"
        onClick={() => editor?.chain().focus().toggleTaskList().run()}
      />
    </div>
  );
}
