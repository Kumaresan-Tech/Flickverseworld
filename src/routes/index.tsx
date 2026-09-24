import { createFileRoute, Link } from "@tanstack/react-router";

import { Hero } from "@/components/Hero";
import { MovieRow } from "@/components/MovieRow";
import { FEATURED, GENRES, TOP_RATED, TRENDING } from "@/data/movies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FlickVerse — Discover your next favourite film" },
      {
        name: "description",
        content:
          "Browse a curated catalogue of modern classics, filter by genre, year and rating, watch trailers and build your personal watchlist.",
      },
      { property: "og:title", content: "FlickVerse — Discover your next favourite film" },
      {
        property: "og:description",
        content:
          "Curated movie discovery: trending picks, top rated films, trailers and a watchlist that stays with you.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <Hero movie={FEATURED} />

      <div className="mx-auto w-full max-w-7xl space-y-16 px-4 py-14 sm:px-6">
        <MovieRow
          id="trending"
          title="Trending now"
          subtitle="What everyone is talking about this week"
          movies={TRENDING}
        />
        <MovieRow
          id="top-rated"
          title="Top rated"
          subtitle="The highest scoring films in the catalogue"
          movies={TOP_RATED}
        />

        <section aria-labelledby="browse-genres">
          <h2 id="browse-genres" className="text-xl font-bold text-foreground sm:text-2xl">
            Browse by genre
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {GENRES.map((genre) => (
              <li key={genre}>
                <Link
                  to="/movies"
                  search={{ genre }}
                  className="inline-flex rounded-full border border-border bg-secondary/60 px-4 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:border-primary/60 hover:text-foreground"
                >
                  {genre}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
