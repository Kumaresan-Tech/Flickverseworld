import { MovieCard } from "@/components/MovieCard";
import type { Movie } from "@/data/movies";

type MovieRowProps = {
  id?: string;
  title: string;
  subtitle?: string;
  movies: Movie[];
};

export function MovieRow({ id, title, subtitle, movies }: MovieRowProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold text-foreground sm:text-2xl">{title}</h2>
          {subtitle ? (
            <p className="mt-1 truncate text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
      </div>

      <ul className="scrollbar-none -mx-4 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="w-[44vw] max-w-[220px] shrink-0 snap-start sm:w-48 lg:w-52"
          >
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </section>
  );
}
