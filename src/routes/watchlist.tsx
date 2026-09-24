import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Bookmark } from "lucide-react";

import { EmptyState } from "@/components/EmptyState";
import { MovieGrid } from "@/components/MovieGrid";
import { MOVIES } from "@/data/movies";
import { useWatchlist } from "@/hooks/useWatchlist";

export const Route = createFileRoute("/watchlist")({
  head: () => ({
    meta: [
      { title: "Your Watchlist — FlickVerse" },
      {
        name: "description",
        content:
          "Every film you saved in FlickVerse, stored in your own browser and waiting for your next movie night.",
      },
      { property: "og:title", content: "Your Watchlist — FlickVerse" },
      {
        property: "og:description",
        content: "The films you saved for later, kept safely in your browser.",
      },
    ],
  }),
  component: WatchlistPage,
});

function WatchlistPage() {
  const { ids, clear } = useWatchlist();
  const saved = useMemo(() => MOVIES.filter((movie) => ids.includes(movie.id)), [ids]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Your watchlist</h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            {saved.length
              ? `${saved.length} ${saved.length === 1 ? "film" : "films"} saved on this device.`
              : "Nothing saved yet."}
          </p>
        </div>
        {saved.length ? (
          <button
            type="button"
            onClick={clear}
            className="shrink-0 rounded-xl border border-border px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Clear all
          </button>
        ) : null}
      </header>

      <div className="mt-10">
        {saved.length ? (
          <MovieGrid movies={saved} />
        ) : (
          <EmptyState
            icon={<Bookmark className="h-6 w-6" aria-hidden="true" />}
            title="Your watchlist is empty"
            description="Tap the watchlist button on any movie card or details page and it will show up here — even after you refresh."
            action={
              <Link
                to="/movies"
                search={{}}
                className="gradient-brand inline-flex rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03]"
              >
                Find something to watch
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
}
