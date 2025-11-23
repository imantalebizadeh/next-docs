import { useQueryState } from "nuqs";
import { createLoader, parseAsString } from "nuqs/server";

const searchParamsSchema = {
  search: parseAsString,
};

export function useSearchParams() {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  return {
    search,
    setSearch,
  };
}

export const loadSearchParams = createLoader(searchParamsSchema);
