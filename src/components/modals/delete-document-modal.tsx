import { useRouter } from "next/navigation";

import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { ConvexError } from "convex/values";
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
  documentId: Id<"documents">;
  redirectTo?: string;
};

export function DeleteDocumentModal({
  open,
  onOpenChange,
  documentId,
  redirectTo,
}: DeleteDocumentModalProps) {
  const router = useRouter();

  const deleteDocumentMutation = useMutation({
    mutationFn: useConvexMutation(api.documents.remove),
    onSuccess: () => {
      toast.success("Document deleted successfully");
      onOpenChange(false);

      // Redirect to the redirectTo page if it is provided
      if (redirectTo) {
        router.push(redirectTo);
      }
    },
    onError: (error) => {
      console.log(error);

      if (error instanceof ConvexError) {
        toast.error((error.data as { message: string }).message);
      } else {
        toast.error("Failed to delete document");
      }
    },
  });

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
            onClick={() => deleteDocumentMutation.mutate({ documentId })}
            disabled={deleteDocumentMutation.isPending}
          >
            {!!deleteDocumentMutation.isPending && <Spinner />}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
