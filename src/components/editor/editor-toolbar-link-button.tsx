"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Editor, useEditorState } from "@tiptap/react";
import { LinkIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { EditorToolbarButton } from "./editor-toolbar-button";

const linkSchema = z.object({
  link: z.url("Please enter a valid link"),
});

type LinkFormValues = z.infer<typeof linkSchema>;

export function EditorToolbarLinkButton({ editor }: { editor: Editor | null }) {
  const [open, setOpen] = useState(false);

  const form = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      link: "",
    },
  });

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isLinkActive: ctx.editor?.isActive("link"),
    }),
  });

  const onSubmit = ({ link }: LinkFormValues) => {
    if (!editor) {
      return;
    }

    // If there's selected text, set link on it
    // Otherwise, insert link at cursor position
    if (editor.state.selection.empty) {
      // No selection, insert link text
      editor
        .chain()
        .focus()
        .insertContent(`<a href="${link}" target="_blank">${link}</a>`)
        .run();
    } else {
      // Has selection, set link on selected text
      // Extend mark range to include the entire link if cursor is inside a link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: link, target: "_blank" })
        .run();
    }

    form.reset();
    setOpen(false);
  };

  // Get current link URL when popover opens
  const handleOpenChange = (openState: boolean) => {
    setOpen(openState);
    if (openState && editor) {
      const linkAttrs = editor.getAttributes("link");
      if (linkAttrs.href) {
        form.setValue("link", linkAttrs.href);
      } else {
        form.reset();
      }
    }
  };

  // Remove link from selected text or cursor position
  const handleRemoveLink = () => {
    if (!editor) {
      return;
    }

    editor.chain().focus().unsetLink().run();
    form.reset();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <EditorToolbarButton icon={LinkIcon} label="Link" />
      </PopoverTrigger>
      <PopoverContent align="start">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-y-4">
            <Controller
              name="link"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="link-url">Set Link</FieldLabel>
                  <Input
                    {...field}
                    id="link-url"
                    placeholder="https://example.com"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="flex items-center gap-x-2 *:flex-1">
              <Button type="submit" size="sm">
                {editorState?.isLinkActive ? "Update Link" : "Set Link"}
              </Button>
              {editorState?.isLinkActive && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveLink}
                >
                  Unset Link
                </Button>
              )}
            </div>
          </FieldGroup>
        </form>
      </PopoverContent>
    </Popover>
  );
}
