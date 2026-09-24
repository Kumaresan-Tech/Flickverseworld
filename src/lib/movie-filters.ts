import type { Movie } from "@/data/movies";

export type SortKey = "rating-desc" | "rating-asc" | "year-desc" | "year-asc" | "title-asc";

export type MovieFilters = {
  query: string;
  genre: string; // "" = all
  year: string; // "" = all
  minRating: number; // 0 = all
  sort: SortKey;
};

export const DEFAULT_FILTERS: MovieFilters = {
  query: "",
  genre: "",
  year: "",
  minRating: 0,
  sort: "rating-desc",
};

export function matchesQuery(movie: Movie, rawQuery: string): boolean {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    movie.title,
    movie.director,
    String(movie.year),
    ...movie.cast,
    ...movie.genres,
  ]
    .join(" ")
    .toLowerCase();
  return q.split(/\s+/).every((token) => haystack.includes(token));
}

export function sortMovies(movies: Movie[], sort: SortKey): Movie[] {
  const out = [...movies];
  switch (sort) {
    case "rating-asc":
      return out.sort((a, b) => a.rating - b.rating);
    case "year-desc":
      return out.sort((a, b) => b.year - a.year);
    case "year-asc":
      return out.sort((a, b) => a.year - b.year);
    case "title-asc":
      return out.sort((a, b) => a.title.localeCompare(b.title));
    case "rating-desc":
    default:
      return out.sort((a, b) => b.rating - a.rating);
  }
}

export function filterMovies(movies: Movie[], filters: MovieFilters): Movie[] {
  const result = movies.filter((movie) => {
    if (!matchesQuery(movie, filters.query)) return false;
    if (filters.genre && !movie.genres.includes(filters.genre)) return false;
    if (filters.year && movie.year !== Number(filters.year)) return false;
    if (filters.minRating > 0 && movie.rating < filters.minRating) return false;
    return true;
  });
  return sortMovies(result, filters.sort);
}

export function relatedMovies(movies: Movie[], movie: Movie, limit = 5): Movie[] {
  return movies
    .filter((m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g)))
    .map((m) => ({
      movie: m,
      shared: m.genres.filter((g) => movie.genres.includes(g)).length,
    }))
    .sort((a, b) => b.shared - a.shared || b.movie.rating - a.movie.rating)
    .slice(0, limit)
    .map((entry) => entry.movie);
}

export const formatDuration = (minutes: number) =>
  `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
