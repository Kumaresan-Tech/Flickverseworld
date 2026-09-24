import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Search movies, actors, directors…",
  className,
  id = "movie-search",
}: SearchBarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <label className="sr-only" htmlFor={id}>
        Search movies
      </label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id={id}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-border bg-secondary/60 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 focus:border-primary/60 focus:outline-none"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
