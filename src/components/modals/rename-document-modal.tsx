import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconX } from "@tabler/icons-react";
import { useMutation } from "convex/react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Document title must be at least 1 characters.")
    .max(32, "Document title must be at most 32 characters."),
});

type RenameDocumentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentId: string;
  documentTitle: string;
};

export function RenameDocumentModal({
  open,
  onOpenChange,
  documentId,
  documentTitle,
}: RenameDocumentModalProps) {
  const [isPending, setIsPending] = useState(false);
  const updateDocument = useMutation(api.documents.update);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: documentTitle },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      await updateDocument({
        documentId: documentId as Id<"documents">,
        title: data.title,
      });

      toast.success("Document title changed successfully");
      onOpenChange(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to change document title");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader className="flex-row items-center justify-between">
          <DialogTitle>Rename Document</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon-xs" className="rounded-full">
              <IconX />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <form id="rename-document-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="document-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="document-title"
                    aria-invalid={fieldState.invalid}
                    placeholder={documentTitle}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field>
              <Button
                type="submit"
                form="rename-document-form"
                disabled={isPending || form.watch("title") === documentTitle}
              >
                {isPending && <Spinner />}
                Save
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
