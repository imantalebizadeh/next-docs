import { ConvexHttpClient } from "convex/browser";

import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { env } from "@/env";

const httpClient = new ConvexHttpClient(env.NEXT_PUBLIC_CONVEX_URL);

export async function getDocumentsByIds(documentIds: Id<"documents">[]) {
  const documents = await httpClient.query(api.documents.listByIds, {
    documentIds,
  });
  return documents;
}
