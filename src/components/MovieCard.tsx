import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, Star } from "lucide-react";

import { POSTER_FALLBACK, type Movie } from "@/data/movies";
import { useWatchlist } from "@/hooks/useWatchlist";
import { cn } from "@/lib/utils";

type MovieCardProps = {
  movie: Movie;
  className?: string;
};

export function MovieCard({ movie, className }: MovieCardProps) {
  const { has, toggle } = useWatchlist();
  const saved = has(movie.id);

  return (
    <article
      className={cn(
        "card-glow group relative overflow-hidden rounded-2xl border border-border bg-card",
        className,
      )}
    >
      <Link
        to="/movies/$id"
        params={{ id: movie.id }}
        className="block focus-visible:outline-none"
        aria-label={`View details for ${movie.title}`}
      >
        <div className="relative aspect-2/3 overflow-hidden bg-muted">
          <img
            src={movie.poster}
            alt={`${movie.title} movie poster`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[250ms] group-hover:scale-105"
            onError={(event) => {
              const el = event.currentTarget;
              if (el.src !== POSTER_FALLBACK) el.src = POSTER_FALLBACK;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-80" />
          <span className="gradient-brand absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold text-primary-foreground">
            <Star className="h-3 w-3 fill-current" aria-hidden="true" />
            {movie.rating.toFixed(1)}
          </span>
        </div>
        <div className="space-y-1 p-4 pb-14">
          <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">
            {movie.title}
          </h3>
          <p className="truncate text-xs text-muted-foreground">
            {movie.year} · {movie.genres.slice(0, 2).join(", ")}
          </p>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggle(movie.id)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}
        className={cn(
          "absolute bottom-3 left-4 right-4 inline-flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold transition-colors duration-200",
          saved
            ? "gradient-brand border-transparent text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:border-primary/50",
        )}
      >
        {saved ? (
          <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Bookmark className="h-4 w-4" aria-hidden="true" />
        )}
        {saved ? "In watchlist" : "Watchlist"}
      </button>
    </article>
  );
}
