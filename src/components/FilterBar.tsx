import { SlidersHorizontal, RotateCcw } from "lucide-react";

import { GENRES, YEARS } from "@/data/movies";
import { DEFAULT_FILTERS, type MovieFilters, type SortKey } from "@/lib/movie-filters";

type FilterBarProps = {
  filters: MovieFilters;
  onChange: (patch: Partial<MovieFilters>) => void;
  onReset: () => void;
  resultCount: number;
};

const selectClass =
  "h-11 w-full rounded-xl border border-border bg-secondary/60 px-3 text-sm text-foreground transition-colors duration-200 focus:border-primary/60 focus:outline-none";

const RATINGS = [0, 7, 7.5, 8, 8.5];

const SORTS: { value: SortKey; label: string }[] = [
  { value: "rating-desc", label: "Rating: high to low" },
  { value: "rating-asc", label: "Rating: low to high" },
  { value: "year-desc", label: "Year: newest first" },
  { value: "year-asc", label: "Year: oldest first" },
  { value: "title-asc", label: "Title: A to Z" },
];

export function FilterBar({ filters, onChange, onReset, resultCount }: FilterBarProps) {
  const dirty =
    filters.genre !== DEFAULT_FILTERS.genre ||
    filters.year !== DEFAULT_FILTERS.year ||
    filters.minRating !== DEFAULT_FILTERS.minRating ||
    filters.sort !== DEFAULT_FILTERS.sort ||
    filters.query !== DEFAULT_FILTERS.query;

  return (
    <section className="surface-panel rounded-2xl p-4 sm:p-5" aria-label="Filters and sorting">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
        <h2 className="flex min-w-0 items-center gap-2 text-sm font-semibold text-foreground">
          <SlidersHorizontal className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="truncate">Refine results</span>
        </h2>
        <p className="shrink-0 text-xs text-muted-foreground">
          {resultCount} {resultCount === 1 ? "movie" : "movies"}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1.5 block text-xs text-muted-foreground" htmlFor="filter-genre">
            Genre
          </label>
          <select
            id="filter-genre"
            className={selectClass}
            value={filters.genre}
            onChange={(event) => onChange({ genre: event.target.value })}
          >
            <option value="">All genres</option>
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted-foreground" htmlFor="filter-year">
            Year
          </label>
          <select
            id="filter-year"
            className={selectClass}
            value={filters.year}
            onChange={(event) => onChange({ year: event.target.value })}
          >
            <option value="">All years</option>
            {YEARS.map((year) => (
              <option key={year} value={String(year)}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted-foreground" htmlFor="filter-rating">
            Minimum rating
          </label>
          <select
            id="filter-rating"
            className={selectClass}
            value={String(filters.minRating)}
            onChange={(event) => onChange({ minRating: Number(event.target.value) })}
          >
            {RATINGS.map((rating) => (
              <option key={rating} value={String(rating)}>
                {rating === 0 ? "Any rating" : `${rating}+`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted-foreground" htmlFor="filter-sort">
            Sort by
          </label>
          <select
            id="filter-sort"
            className={selectClass}
            value={filters.sort}
            onChange={(event) => onChange({ sort: event.target.value as SortKey })}
          >
            {SORTS.map((sort) => (
              <option key={sort.value} value={sort.value}>
                {sort.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {dirty ? (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset all
        </button>
      ) : null}
    </section>
  );
}
