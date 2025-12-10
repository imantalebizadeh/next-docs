import { templates } from "@/constants/templates";

import { TemplateList } from "../template-list";

export function TemplatesSection() {
  return (
    <section className="bg-muted py-6">
      <div className="mx-auto max-w-6xl space-y-4 px-4">
        <p>Start a new document</p>
        <TemplateList templates={templates} />
      </div>
    </section>
  );
}
