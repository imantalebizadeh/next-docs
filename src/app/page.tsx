"use client";

import { Suspense } from "react";

import { Authenticated, AuthLoading } from "convex/react";

import { DocumentsTable } from "@/components/documents/documents-table";
import { DocumentsTableSkeleton } from "@/components/documents/documents-table-skeleton";
import { Header } from "@/components/layout/header";
import { TemplatesSection } from "@/components/layout/templates-section";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function HomePage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <TemplatesSection />
      <div className="mx-auto my-4 w-full max-w-none space-y-2 overflow-x-auto px-4 sm:max-w-6xl">
        <p className="font-medium">Documents</p>
        <Authenticated>
          <Suspense fallback={<div>Loading...</div>}>
            <DocumentsTable />
          </Suspense>
        </Authenticated>
        <AuthLoading>
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Shared With</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead colSpan={2}>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <DocumentsTableSkeleton />
          </Table>
        </AuthLoading>
      </div>
    </div>
  );
}
