"use client";

import { Input } from "@/components/ui/input";
import { useKeybind } from "@/hooks/useKeybind";

import { debounce } from "lodash";
import { useRef } from "react";

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
        className="w-fit rounded rounded-l-lg rounded-r-none border border-muted-foreground/50 bg-muted text-center"
        ref={inputRef}
        placeholder={`Search [ / ]  🔍`}
        onChange={(e) => debouncedUpdateSearchTitle(e.target.value)}
      />
    </div>
  );
};
