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
    <div className="flex w-full">
      <Input
        className="flex-1 rounded-l-lg rounded-r-none border border-border bg-background placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary"
        ref={inputRef}
        placeholder="Search articles..."
        onChange={(e) => debouncedUpdateSearchTitle(e.target.value)}
      />
    </div>
  );
};
