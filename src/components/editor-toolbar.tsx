import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBaseline,
  IconBold,
  IconBucketDroplet,
  IconClearFormatting,
  IconHighlight,
  IconItalic,
  IconList,
  IconListCheck,
  IconListNumbers,
  IconMessageCircle,
  IconPrinter,
  IconStrikethrough,
  IconUnderline,
} from "@tabler/icons-react";
import { type Editor, useEditorState } from "@tiptap/react";

import { EditorToolbarButton } from "./editor/editor-toolbar-button";
import { EditorToolbarColorPicker } from "./editor/editor-toolbar-color-picker";
import { EditorToolbarFontFamilyDropdown } from "./editor/editor-toolbar-fontfamily-dropdown";
import { EditorToolbarFontSizeDropdown } from "./editor/editor-toolbar-fontsize-dropdown";
import { EditorToolbarHeadingDropdown } from "./editor/editor-toolbar-heading-dropdown";
import { EditorToolbarImageDropdown } from "./editor/editor-toolbar-image-dropdown";
import { EditorToolbarLinkButton } from "./editor/editor-toolbar-link-button";
import { EditorToolbarToggle } from "./editor/editor-toolbar-toggle";
import { Separator } from "./ui/separator";

export function EditorToolbar({ editor }: { editor: Editor | null }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      color: ctx.editor?.getAttributes("textStyle").color || "#0a0a0a",
      backgroundColor:
        ctx.editor?.getAttributes("textStyle").backgroundColor || "#ffffff",
      isHighlight: ctx.editor?.isActive("highlight"),
    }),
  });

  return (
    <div className="flex items-center gap-px overflow-x-auto border-border border-t border-b bg-background px-4 py-1 lg:justify-center print:hidden">
      {/* Undo */}
      <EditorToolbarButton
        icon={IconArrowBackUp}
        label="Undo"
        onClick={() => editor?.chain().focus().undo().run()}
      />

      {/* Redo */}
      <EditorToolbarButton
        icon={IconArrowForwardUp}
        label="Redo"
        onClick={() => editor?.chain().focus().redo().run()}
      />

      {/* Print */}
      <EditorToolbarButton
        icon={IconPrinter}
        label="Print"
        onClick={() => window.print()}
      />

      {/* Clear Formatting */}
      <EditorToolbarButton
        icon={IconClearFormatting}
        label="Clear Formatting"
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
        icon={IconBold}
        label="Bold"
        onClick={() => editor?.chain().focus().toggleBold().run()}
      />

      {/* Italic Toggle */}
      <EditorToolbarToggle
        icon={IconItalic}
        label="Italic"
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      />

      {/* Underline Toggle */}
      <EditorToolbarToggle
        icon={IconUnderline}
        label="Underline"
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      />

      {/* Strikethrough Toggle */}
      <EditorToolbarToggle
        icon={IconStrikethrough}
        label="Strikethrough"
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      />

      {/* Text Color Picker */}
      <EditorToolbarColorPicker
        value={editorState?.color}
        onValueChange={(color) => editor?.chain().focus().setColor(color).run()}
        icon={IconBaseline}
      />

      {/* Background Color Picker */}
      <EditorToolbarColorPicker
        value={editorState?.backgroundColor}
        onValueChange={(color) =>
          editor?.chain().focus().setBackgroundColor(color).run()
        }
        icon={IconBucketDroplet}
      />

      {/* Highlight Toggle */}
      <EditorToolbarToggle
        icon={IconHighlight}
        label="Highlight"
        pressed={editorState?.isHighlight}
        onClick={() => editor?.chain().focus().toggleHighlight().run()}
      />

      {/* Separator */}
      <Separator
        className="mx-1 data-[orientation=vertical]:h-8"
        orientation="vertical"
      />

      {/* Link Button */}
      <EditorToolbarLinkButton editor={editor} />

      {/* Add Image Button */}
      <EditorToolbarImageDropdown editor={editor} />

      {/* Add Comment Button */}
      <EditorToolbarButton
        icon={IconMessageCircle}
        label="Add Comment"
        onClick={() => {
          // TODO: Add comment
          console.log("Add Comment");
        }}
      />

      {/* Separator */}
      <Separator
        className="mx-1 data-[orientation=vertical]:h-8"
        orientation="vertical"
      />

      {/* Align Left Button */}
      <EditorToolbarButton
        icon={IconAlignLeft}
        label="Align Left"
        onClick={() => editor?.chain().focus().setTextAlign("left").run()}
      />

      {/* Align Center Button */}
      <EditorToolbarButton
        icon={IconAlignCenter}
        label="Align Center"
        onClick={() => editor?.chain().focus().setTextAlign("center").run()}
      />

      {/* Align Right Button */}
      <EditorToolbarButton
        icon={IconAlignRight}
        label="Align Right"
        onClick={() => editor?.chain().focus().setTextAlign("right").run()}
      />

      {/* Align Justify Button */}
      <EditorToolbarButton
        icon={IconAlignJustified}
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
        icon={IconList}
        label="Unordered List"
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      />

      {/* Ordered List Button */}
      <EditorToolbarButton
        icon={IconListNumbers}
        label="Ordered List"
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      />

      {/* Task List Button */}
      <EditorToolbarButton
        icon={IconListCheck}
        label="Task List"
        onClick={() => editor?.chain().focus().toggleTaskList().run()}
      />
    </div>
  );
}
