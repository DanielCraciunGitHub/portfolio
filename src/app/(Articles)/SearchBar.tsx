"use client";

import { Input } from "@/components/ui/input";
import { debounce } from "lodash";

interface SearchBarProps {
  updateSearchTitle: (title: string) => void;
}

export const SearchBar = ({ updateSearchTitle }: SearchBarProps) => {
  const debouncedUpdateSearchTitle = debounce(updateSearchTitle, 600);
  return (
    <Input
      className="w-fit bg-muted text-center outline outline-muted-foreground/50"
      placeholder="Search 🔍"
      onChange={(e) => debouncedUpdateSearchTitle(e.target.value)}
    />
  );
};
