import { useState } from "react";

import { useMutation } from "convex/react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

type DeleteDocumentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentId: string;
};

export function DeleteDocumentModal({
  open,
  onOpenChange,
  documentId,
}: DeleteDocumentModalProps) {
  const [isPending, setIsPending] = useState(false);
  const deleteDocument = useMutation(api.documents.remove);

  const handleDelete = async () => {
    setIsPending(true);
    try {
      await deleteDocument({ documentId: documentId as Id<"documents"> });

      onOpenChange(false);
      toast.success("Document deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete document");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            document and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending && <Spinner />}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
