import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";

import { EmptyState } from "@/components/EmptyState";
import { FilterBar } from "@/components/FilterBar";
import { MovieGrid } from "@/components/MovieGrid";
import { SearchBar } from "@/components/SearchBar";
import { MOVIES } from "@/data/movies";
import {
  DEFAULT_FILTERS,
  filterMovies,
  type MovieFilters,
  type SortKey,
} from "@/lib/movie-filters";

type MoviesSearch = { q?: string; genre?: string; year?: string; sort?: SortKey };

export const Route = createFileRoute("/movies/")({
  validateSearch: (search: Record<string, unknown>): MoviesSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
    genre: typeof search.genre === "string" ? search.genre : undefined,
    year: typeof search.year === "string" ? search.year : undefined,
    sort: typeof search.sort === "string" ? (search.sort as SortKey) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "All Movies — FlickVerse" },
      {
        name: "description",
        content:
          "Search the full FlickVerse catalogue and combine genre, year and rating filters with flexible sorting.",
      },
      { property: "og:title", content: "All Movies — FlickVerse" },
      {
        property: "og:description",
        content: "Search, filter and sort the entire FlickVerse movie catalogue.",
      },
    ],
  }),
  component: MoviesPage,
});

function MoviesPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<MovieFilters>({
    ...DEFAULT_FILTERS,
    query: search.q ?? "",
    genre: search.genre ?? "",
    year: search.year ?? "",
    sort: search.sort ?? DEFAULT_FILTERS.sort,
  });

  const results = useMemo(() => filterMovies(MOVIES, filters), [filters]);

  const patch = (next: Partial<MovieFilters>) =>
    setFilters((current) => ({ ...current, ...next }));

  const reset = () => {
    setFilters(DEFAULT_FILTERS);
    navigate({ to: "/movies", search: {}, replace: true });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">All movies</h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Search by title, actor, director or genre, then narrow things down with filters.
        </p>
      </header>

      <div className="mt-8 space-y-4">
        <SearchBar value={filters.query} onChange={(query) => patch({ query })} />
        <FilterBar
          filters={filters}
          onChange={patch}
          onReset={reset}
          resultCount={results.length}
        />
      </div>

      <div className="mt-10">
        {results.length ? (
          <MovieGrid movies={results} />
        ) : (
          <EmptyState
            icon={<SearchX className="h-6 w-6" aria-hidden="true" />}
            title="No movies match those filters"
            description="Try a different search term, widen the rating range, or reset the filters to see the full catalogue."
            action={
              <button
                type="button"
                onClick={reset}
                className="gradient-brand rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03]"
              >
                Reset filters
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}
