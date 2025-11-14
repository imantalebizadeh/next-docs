"use client";

import { useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Editor } from "@tiptap/react";
import { ImageIcon, LinkIcon, UploadIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { EditorToolbarButton } from "./editor-toolbar-button";

const imageUrlSchema = z.object({
  url: z.url("Please enter a valid URL"),
});

type ImageUrlFormValues = z.infer<typeof imageUrlSchema>;

type ImageUrlDialogProps = {
  editor: Editor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function AddImageFromUrlDialog({
  editor,
  open,
  onOpenChange,
}: ImageUrlDialogProps) {
  const form = useForm<ImageUrlFormValues>({
    resolver: zodResolver(imageUrlSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = ({ url }: ImageUrlFormValues) => {
    if (!editor) {
      return;
    }

    // Insert image at cursor position
    editor.chain().focus().setImage({ src: url }).run();

    form.reset();
    onOpenChange(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Image from URL</DialogTitle>
          <DialogDescription>
            Enter the URL of the image you want to insert.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-y-4">
            <Controller
              name="url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="image-url">Image URL</FieldLabel>
                  <Input
                    {...field}
                    id="image-url"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Image</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function EditorToolbarImageDropdown({
  editor,
}: {
  editor: Editor | null;
}) {
  const [urlDialogOpen, setUrlDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!(file && editor)) {
      return;
    }

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Create a FileReader to read the file
    const reader = new FileReader();

    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (src) {
        // Insert image at cursor position
        editor.chain().focus().setImage({ src }).run();
      }
    };

    reader.onerror = () => {
      console.error("Error reading file");
    };

    reader.readAsDataURL(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    setDropdownOpen(false);
    fileInputRef.current?.click();
  };

  const handleUrlClick = () => {
    setDropdownOpen(false);
    setUrlDialogOpen(true);
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <EditorToolbarButton icon={ImageIcon} label="Add Image" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={handleUrlClick}>
            <LinkIcon className="mr-2 size-4" />
            Add Image from URL
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleUploadClick}>
            <UploadIcon className="mr-2 size-4" />
            Upload Image from Computer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Upload image"
      />
      <AddImageFromUrlDialog
        editor={editor}
        open={urlDialogOpen}
        onOpenChange={setUrlDialogOpen}
      />
    </>
  );
}
