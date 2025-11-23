import { DocumentsTable } from "@/components/documents/documents-table";
import { Header } from "@/components/layout/header";
import { TemplatesSection } from "@/components/layout/templates-section";

export default function HomePage() {
  return (
    <div>
      <Header />
      <TemplatesSection />
      <DocumentsTable />
    </div>
  );
}
