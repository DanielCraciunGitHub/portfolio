"use client";

import { useRef } from "react";
import { debounce } from "lodash";

import { useKeybind } from "@/hooks/useKeybind";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  updateSearchTitle: (title: string) => void;
}

export const SearchBar = ({ updateSearchTitle }: SearchBarProps) => {
  const debouncedUpdateSearchTitle = debounce(updateSearchTitle, 600);
  const inputRef = useRef<HTMLInputElement>(null);

  useKeybind(inputRef, { key: "/" }, () => inputRef.current?.focus());

  return (
    <div className="flex">
      <Input
        className="w-fit border border-muted-foreground/50 bg-muted text-center sm:rounded sm:rounded-l-lg sm:rounded-r-none"
        ref={inputRef}
        placeholder="Search"
        onChange={(e) => debouncedUpdateSearchTitle(e.target.value)}
      />
    </div>
  );
};
