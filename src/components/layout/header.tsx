import Link from "next/link";

import { IconUser } from "@tabler/icons-react";

import { Logo } from "../logo";
import { Button } from "../ui/button";
import { SearchInput } from "./search-input";

export function Header() {
  return (
    <header className="flex items-center p-4">
      <Link href="/" className="flex items-center gap-2">
        <Logo className="size-10" />
        <p className="font-medium text-xl">Docs</p>
      </Link>
      <SearchInput />
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <IconUser className="size-4" />
        </Button>
      </div>
    </header>
  );
}
