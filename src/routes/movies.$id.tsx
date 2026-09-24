import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Bookmark, BookmarkCheck, Clock, Play, Star } from "lucide-react";

import { MovieCard } from "@/components/MovieCard";
import { TrailerModal } from "@/components/TrailerModal";
import { MOVIES, POSTER_FALLBACK, getMovieById } from "@/data/movies";
import { useWatchlist } from "@/hooks/useWatchlist";
import { formatDuration, relatedMovies } from "@/lib/movie-filters";

export const Route = createFileRoute("/movies/$id")({
  loader: ({ params }) => {
    const movie = getMovieById(params.id);
    if (!movie) throw notFound();
    return { movie };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Movie not found — FlickVerse" }, { name: "robots", content: "noindex" }],
      };
    }
    const { movie } = loaderData;
    const title = `${movie.title} (${movie.year}) — FlickVerse`;
    return {
      meta: [
        { title },
        { name: "description", content: movie.description },
        { property: "og:title", content: title },
        { property: "og:description", content: movie.description },
        { property: "og:image", content: movie.backdrop },
        { name: "twitter:image", content: movie.backdrop },
      ],
    };
  },
  component: MovieDetails,
  notFoundComponent: MovieNotFound,
});

function MovieNotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-24 text-center sm:px-6">
      <h1 className="text-2xl font-bold text-foreground">We couldn't find that movie</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The title may have been renamed or removed from the catalogue.
      </p>
      <Link
        to="/movies"
        search={{}}
        className="gradient-brand mt-8 inline-flex rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground"
      >
        Browse all movies
      </Link>
    </div>
  );
}

function MovieDetails() {
  const { movie } = Route.useLoaderData();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { has, toggle } = useWatchlist();
  const saved = has(movie.id);

  const related = useMemo(() => relatedMovies(MOVIES, movie), [movie]);

  return (
    <div>
      <div className="relative isolate">
        <img
          src={movie.backdrop}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top opacity-35"
          onError={(event) => {
            const el = event.currentTarget;
            if (el.src !== POSTER_FALLBACK) el.src = POSTER_FALLBACK;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/60" />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <Link
            to="/movies"
            search={{}}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to movies
          </Link>

          <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
            <div className="mx-auto w-40 overflow-hidden rounded-2xl border border-border bg-card sm:w-52 md:mx-0 md:w-full">
              <img
                src={movie.poster}
                alt={`${movie.title} movie poster`}
                loading="lazy"
                decoding="async"
                className="aspect-2/3 w-full object-cover"
                onError={(event) => {
                  const el = event.currentTarget;
                  if (el.src !== POSTER_FALLBACK) el.src = POSTER_FALLBACK;
                }}
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
                {movie.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
                <span className="gradient-brand inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-primary-foreground">
                  <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                  {movie.rating.toFixed(1)}
                </span>
                <span>{movie.year}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {formatDuration(movie.duration)}
                </span>
              </div>

              <ul className="mt-4 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <li key={genre}>
                    <Link
                      to="/movies"
                      search={{ genre }}
                      className="inline-flex rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground transition-colors duration-200 hover:border-primary/60 hover:text-foreground"
                    >
                      {genre}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {movie.description}
              </p>

              <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                    Director
                  </dt>
                  <dd className="mt-1 text-foreground">{movie.director}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">Cast</dt>
                  <dd className="mt-1 text-foreground">{movie.cast.join(", ")}</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setTrailerOpen(true)}
                  className="gradient-brand inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03]"
                >
                  <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                  Watch Trailer
                </button>
                <button
                  type="button"
                  onClick={() => toggle(movie.id)}
                  aria-pressed={saved}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/60 px-5 py-3 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-primary/60"
                >
                  {saved ? (
                    <BookmarkCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                  ) : (
                    <Bookmark className="h-4 w-4" aria-hidden="true" />
                  )}
                  {saved ? "In your watchlist" : "Add to watchlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length ? (
        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">More like this</h2>
          <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {related.map((item) => (
              <li key={item.id}>
                <MovieCard movie={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <TrailerModal
        open={trailerOpen}
        onOpenChange={setTrailerOpen}
        title={movie.title}
        trailerUrl={movie.trailerUrl}
      />
    </div>
  );
}
