"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { useConvexMutation } from "@convex-dev/react-query";
import {
  ClientSideSuspense,
  useOthers,
  useSyncStatus,
} from "@liveblocks/react";
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconCloudCheck,
  IconEdit,
  IconFileExport,
  IconFileInvoice,
  IconPrinter,
  IconTable,
} from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import { toast } from "sonner";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import {
  exportAsHTML,
  exportAsJSON,
  exportAsText,
  insertTable,
} from "@/lib/editor";

import { useEditorStore } from "@/providers/editor-provider";

import { api } from "../../../convex/_generated/api";
import { AvatarStack, AvatarStackSkeleton } from "../liveblocks/avatar-stack";
import { NotificationsButton } from "../liveblocks/notifications";
import { Logo } from "../logo";
import { RenameDocumentModal } from "../modals/rename-document-modal";
import {
  Editable,
  EditableArea,
  EditableInput,
  EditablePreview,
} from "../ui/editable";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { Spinner } from "../ui/spinner";

export function DocumentHeader({
  preloadedDocument,
}: {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}) {
  const [openRenameDocumentModal, setOpenRenameDocumentModal] = useState(false);

  const router = useRouter();
  const users = useOthers();
  const syncStatus = useSyncStatus({ smooth: true });
  const editor = useEditorStore((store) => store.editor);

  const document = usePreloadedQuery(preloadedDocument);

  const createDocumentMutation = useMutation({
    mutationFn: useConvexMutation(api.documents.create),
    onSuccess: (data) => {
      router.push(`/documents/${data}`);
      toast.success("Document created successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create document");
    },
  });

  const updateDocumentMutation = useMutation({
    mutationFn: useConvexMutation(api.documents.update),
    onSuccess: () => {
      toast.success("Document updated successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update document");
    },
  });

  const isSyncing =
    syncStatus === "synchronizing" || updateDocumentMutation.isPending;

  return (
    <header className="flex items-center gap-2 bg-background p-2 print:hidden">
      {/* App Logo */}
      <Link href="/">
        <Logo className="size-12" />
      </Link>

      <div className="flex flex-col">
        {/* Document name */}
        <div className="flex items-center gap-2">
          <Editable
            placeholder="Enter the document name here"
            value={document.title}
            onValueChange={(value) => {
              if (value.trim() !== document.title.trim()) {
                updateDocumentMutation.mutate({
                  documentId: document._id,
                  title: value,
                });
              }
            }}
            triggerMode="click"
            debounce={1000}
            required
            autosize
          >
            <EditableArea>
              <EditablePreview className="p-0 font-medium text-[17px]" />
              <EditableInput className="p-0 font-medium text-[17px]" />
            </EditableArea>
          </Editable>
          {/* Sync status */}
          {isSyncing ? (
            <Spinner className="size-4 text-muted-foreground" title="Syncing" />
          ) : (
            <IconCloudCheck
              className="size-4 text-muted-foreground"
              title="Synced"
            />
          )}
        </div>

        {/* Menu bar */}
        <Menubar className="-ml-2 h-8 border-none p-px shadow-none">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent className="print:hidden">
              <MenubarItem
                onClick={() =>
                  createDocumentMutation.mutate({
                    title: "Untitled Document",
                    content: "",
                  })
                }
                disabled={createDocumentMutation.isPending}
              >
                <IconFileInvoice />
                New Document
              </MenubarItem>
              <MenubarSub>
                <MenubarSubTrigger className="gap-2">
                  <IconFileExport className="size-4 text-muted-foreground" />
                  Export
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem
                    onClick={() =>
                      exportAsHTML(editor, `${document.title}.html`)
                    }
                  >
                    HTML
                  </MenubarItem>
                  <MenubarItem
                    onClick={() =>
                      exportAsJSON(editor, `${document.title}.json`)
                    }
                  >
                    JSON
                  </MenubarItem>
                  <MenubarItem
                    onClick={() =>
                      exportAsText(editor, `${document.title}.txt`)
                    }
                  >
                    Text
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem onClick={() => setOpenRenameDocumentModal(true)}>
                <IconEdit />
                Rename
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => window.print()}>
                <IconPrinter />
                Print <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent className="print:hidden">
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
            <MenubarContent className="print:hidden">
              <MenubarSub>
                <MenubarSubTrigger className="gap-2">
                  <IconTable className="size-4 text-muted-foreground" />
                  Table
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem onClick={() => insertTable(editor, 1, 1)}>
                    1 x 1
                  </MenubarItem>
                  <MenubarItem onClick={() => insertTable(editor, 2, 2)}>
                    2 x 2
                  </MenubarItem>
                  <MenubarItem onClick={() => insertTable(editor, 3, 3)}>
                    3 x 3
                  </MenubarItem>
                  <MenubarItem onClick={() => insertTable(editor, 4, 4)}>
                    4 x 4
                  </MenubarItem>
                  <MenubarItem onClick={() => insertTable(editor, 5, 5)}>
                    5 x 5
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        {/* Rename document modal */}
        <RenameDocumentModal
          open={openRenameDocumentModal}
          onOpenChange={setOpenRenameDocumentModal}
          documentId={document._id}
          documentTitle={document.title}
        />
      </div>

      {/* User and organization switcher */}
      <div className="ml-auto flex items-center gap-2">
        {/* Avatar stack */}
        <ClientSideSuspense fallback={<AvatarStackSkeleton />}>
          <AvatarStack />
        </ClientSideSuspense>

        {/* Separator */}
        {/* If there are other users in the room, show a separator */}
        {users.length > 0 && (
          <Separator
            orientation="vertical"
            className="-mr-2 data-[orientation=vertical]:h-7"
          />
        )}

        {/* Organization switcher */}
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
          fallback={<Skeleton className="h-8 w-28 rounded-md" />}
        />

        {/* Notifications button */}
        <ClientSideSuspense
          fallback={<Skeleton className="size-8 rounded-full" />}
        >
          <NotificationsButton />
        </ClientSideSuspense>

        {/* User button */}
        <UserButton fallback={<Skeleton className="size-8 rounded-full" />} />
      </div>
    </header>
  );
}
