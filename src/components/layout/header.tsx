import Link from "next/link";

import { UserButton } from "@clerk/nextjs";

import { Logo } from "../logo";
import { Skeleton } from "../ui/skeleton";
import { SearchInput } from "./search-input";

export function Header() {
  return (
    <header className="flex items-center p-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Logo className="size-10" />
        <p className="font-medium text-xl">Docs</p>
      </Link>

      {/* Search Input */}
      <SearchInput />

      {/* User Button */}
      <UserButton fallback={<Skeleton className="size-8 rounded-full" />} />
    </header>
  );
}
