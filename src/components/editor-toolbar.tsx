import { type Editor, useEditorState } from "@tiptap/react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BaselineIcon,
  BoldIcon,
  HighlighterIcon,
  ItalicIcon,
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

      {/* Highlight Toggle */}
      <EditorToolbarToggle
        icon={HighlighterIcon}
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
        icon={MessageCircleMoreIcon}
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
