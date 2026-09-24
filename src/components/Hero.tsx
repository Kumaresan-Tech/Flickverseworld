import { Link } from "@tanstack/react-router";
import { Compass, Play, Star } from "lucide-react";
import { useState } from "react";

import { TrailerModal } from "@/components/TrailerModal";
import { POSTER_FALLBACK, type Movie } from "@/data/movies";
import { formatDuration } from "@/lib/movie-filters";

export function Hero({ movie }: { movie: Movie }) {
  const [trailerOpen, setTrailerOpen] = useState(false);

  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={movie.backdrop}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top opacity-40"
        onError={(event) => {
          const el = event.currentTarget;
          if (el.src !== POSTER_FALLBACK) el.src = POSTER_FALLBACK;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/50" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Featured tonight
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            {movie.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            <span className="gradient-brand inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-primary-foreground">
              <Star className="h-3 w-3 fill-current" aria-hidden="true" />
              {movie.rating.toFixed(1)}
            </span>
            <span>{movie.year}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDuration(movie.duration)}</span>
            <span aria-hidden="true">·</span>
            <span>{movie.genres.join(" / ")}</span>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {movie.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setTrailerOpen(true)}
              className="gradient-brand inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03]"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Watch Trailer
            </button>
            <Link
              to="/movies"
              search={{}}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/60 px-5 py-3 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-primary/60"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Explore Movies
            </Link>
          </div>
        </div>
      </div>

      <TrailerModal
        open={trailerOpen}
        onOpenChange={setTrailerOpen}
        title={movie.title}
        trailerUrl={movie.trailerUrl}
      />
    </section>
  );
}
