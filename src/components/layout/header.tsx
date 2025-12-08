import Link from "next/link";

import { useState } from "react";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { IconSearch, IconX } from "@tabler/icons-react";

import { useSearchParams } from "@/hooks/use-search-params";

import { Logo } from "../logo";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { SearchInput } from "./search-input";

export function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const { setSearch } = useSearchParams();

  return (
    <header className="relative flex h-16 items-center justify-center">
      <section className="absolute inset-0 flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo className="size-10" />
          <p className="font-medium text-xl">Docs</p>
        </Link>

        <div className="flex items-center gap-2">
          {/* Search Button */}
          <Button
            variant="ghost"
            size="icon-xs"
            className="inline-flex rounded-full sm:hidden"
            onClick={() => setOpenSearch(true)}
          >
            <IconSearch />
          </Button>

          {/* Organization Switcher */}
          <OrganizationSwitcher
            afterCreateOrganizationUrl="/"
            afterLeaveOrganizationUrl="/"
            afterSelectOrganizationUrl="/"
            afterSelectPersonalUrl="/"
            fallback={<Skeleton className="h-8 w-28 rounded-md" />}
          />

          {/* User Button */}
          <UserButton fallback={<Skeleton className="size-8 rounded-full" />} />
        </div>
      </section>

      {/* Search Input - Desktop */}
      <SearchInput className="hidden sm:block" />

      {/* Search Input - Mobile */}
      {!!openSearch && (
        <section className="absolute inset-0 z-10 flex items-center justify-center gap-x-3 bg-background px-4 transition-all duration-300 ease-in-out">
          <SearchInput />

          {/* Close Button */}
          <Button
            variant="outline"
            size="icon"
            className="size-10 rounded-full bg-accent"
            onClick={() => {
              setOpenSearch(false);
              setSearch(null);
            }}
          >
            <IconX />
          </Button>
        </section>
      )}
    </header>
  );
}
