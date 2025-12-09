"use client";

import Link from "next/link";

import {
  IconBuilding,
  IconFileInvoice,
  IconUserCircle,
} from "@tabler/icons-react";
import { usePaginatedQuery } from "convex/react";
import { format, formatDistanceToNowStrict } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useSearchParams } from "@/hooks/use-search-params";

import { prewarmRoom } from "@/lib/actions";
import { cn } from "@/lib/utils";

import { api } from "../../../convex/_generated/api";
import { DocumentsTableRowActions } from "./documents-table-row-actions";
import { DocumentsTableSkeleton } from "./documents-table-skeleton";

export function DocumentsTable() {
  const { search } = useSearchParams();
  const {
    isLoading,
    loadMore,
    status,
    results: documents,
  } = usePaginatedQuery(api.documents.list, { search }, { initialNumItems: 5 });

  return (
    <>
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Shared With</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead colSpan={2}>Created At</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <DocumentsTableSkeleton />
        ) : documents.length === 0 ? (
          <TableBody className="last:border-b">
            <TableRow className="hover:bg-background">
              <TableCell colSpan={5} className="h-24 text-center">
                No documents found.
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {documents?.map((document) => (
              <TableRow key={document._id}>
                <TableCell>
                  <div className="flex items-center gap-x-2">
                    <IconFileInvoice className="size-4" />
                    <Link
                      href={`/documents/${document._id}`}
                      onPointerDown={() => prewarmRoom(document._id)}
                      className="hover:underline"
                    >
                      {document.title}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-2">
                    {document.organizationId ? (
                      <>
                        <IconBuilding className="size-4" />
                        Organization
                      </>
                    ) : (
                      <>
                        <IconUserCircle className="size-4" />
                        Personal
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {formatDistanceToNowStrict(document.updatedAt, {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>
                  {format(document._creationTime, "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <DocumentsTableRowActions document={document} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>

      {/* Load more button */}
      <div
        className={cn(
          "flex items-center justify-center",
          (status === "LoadingFirstPage" || status === "Exhausted") && "hidden"
        )}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => loadMore(5)}
          disabled={status === "LoadingMore"}
        >
          {status === "LoadingMore" ? "Loading..." : "Load more"}
        </Button>
      </div>
    </>
  );
}
