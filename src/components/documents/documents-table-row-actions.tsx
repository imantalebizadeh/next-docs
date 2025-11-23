import { useState } from "react";

import {
  IconDots,
  IconEdit,
  IconExternalLink,
  IconTrash,
} from "@tabler/icons-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Doc } from "../../../convex/_generated/dataModel";
import { DeleteDocumentModal } from "../modals/delete-document-modal";
import { RenameDocumentModal } from "../modals/rename-document-modal";
import { Button } from "../ui/button";
import { env } from "@/env";

export function DocumentsTableRowActions({
  document,
}: {
  document: Doc<"documents">;
}) {
  const [openRenameDocumentModal, setOpenRenameDocumentModal] = useState(false);
  const [openDeleteDocumentModal, setOpenDeleteDocumentModal] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconDots className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="shadow-xs" align="end">
          <DropdownMenuItem
            onClick={() => {
              window.open(
                `${env.NEXT_PUBLIC_APP_URL}/documents/${document._id}`,
                "_blank"
              );
            }}
          >
            <IconExternalLink />
            Open in new tab
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenRenameDocumentModal(true)}>
            <IconEdit />
            Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              setOpenDeleteDocumentModal(true);
            }}
          >
            <IconTrash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RenameDocumentModal
        open={openRenameDocumentModal}
        onOpenChange={setOpenRenameDocumentModal}
        documentId={document._id}
        documentTitle={document.title}
      />
      <DeleteDocumentModal
        open={openDeleteDocumentModal}
        onOpenChange={setOpenDeleteDocumentModal}
        documentId={document._id}
      />
    </>
  );
}
