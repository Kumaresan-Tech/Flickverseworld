import type { Movie } from "@/data/movies";
import { MovieCard } from "@/components/MovieCard";

export function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}
