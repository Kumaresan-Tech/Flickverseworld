import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { POSTER_FALLBACK, type Movie } from "@/data/movies";

type GenreTileProps = {
  genre: string;
  count: number;
  sample?: Movie;
};

export function GenreTile({ genre, count, sample }: GenreTileProps) {
  return (
    <Link
      to="/movies"
      search={{ genre }}
      className="card-glow group relative block overflow-hidden rounded-2xl border border-border bg-card"
      aria-label={`Browse ${genre} movies`}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
        {sample ? (
          <img
            src={sample.backdrop}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-55 transition-all duration-[250ms] group-hover:scale-105 group-hover:opacity-75"
            onError={(event) => {
              const el = event.currentTarget;
              if (el.src !== POSTER_FALLBACK) el.src = POSTER_FALLBACK;
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-foreground">{genre}</h3>
            <p className="text-xs text-muted-foreground">{count} titles</p>
          </div>
          <ArrowUpRight
            className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
