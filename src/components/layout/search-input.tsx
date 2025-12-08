"use client";

import type { ComponentProps } from "react";

import { IconSearch, IconX } from "@tabler/icons-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

import { useSearchParams } from "@/hooks/use-search-params";

import { cn } from "@/lib/utils";

export function SearchInput({ className, ...props }: ComponentProps<"div">) {
  const { search, setSearch } = useSearchParams();

  return (
    <div className={cn("w-full max-w-xl", className)} {...props}>
      <InputGroup className="h-10 rounded-full bg-accent">
        <InputGroupInput
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputGroupAddon>
          <InputGroupButton
            variant="ghost"
            size="icon-xs"
            className="rounded-full"
          >
            <IconSearch />
          </InputGroupButton>
        </InputGroupAddon>
        {!!search && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              variant="ghost"
              size="icon-xs"
              className="rounded-full"
              onClick={() => setSearch(null)}
            >
              <IconX />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  );
}
