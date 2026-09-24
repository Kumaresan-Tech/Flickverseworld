import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, Filter, Play } from "lucide-react";

import { GENRES, MOVIES } from "@/data/movies";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About FlickVerse" },
      {
        name: "description",
        content:
          "FlickVerse is a small, fast movie discovery app: a hand-picked catalogue, real trailers and a watchlist that lives in your browser.",
      },
      { property: "og:title", content: "About FlickVerse" },
      {
        property: "og:description",
        content: "Why FlickVerse exists and how the catalogue works.",
      },
    ],
  }),
  component: AboutPage,
});

const FEATURES = [
  {
    icon: Filter,
    title: "Search that actually finds things",
    body: "Look up a film by title, a director you admire or an actor you follow, then stack genre, year and rating filters on top.",
  },
  {
    icon: Play,
    title: "Trailers in one tap",
    body: "Every title links to its official trailer, playing in a clean modal without ever leaving the page.",
  },
  {
    icon: Bookmark,
    title: "A watchlist that remembers",
    body: "Saved films stay in your browser, so your list is still there the next time you open FlickVerse.",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">About FlickVerse</h1>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground">
        FlickVerse is a small, deliberately quiet place to decide what to watch. Instead of an
        endless feed, it offers {MOVIES.length} hand-picked films across {GENRES.length} genres —
        modern classics, festival favourites and a few crowd-pleasers — with just enough detail to
        help you commit.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        There are no accounts and nothing to sign up for. The catalogue ships with the app and your
        watchlist stays on your own device.
      </p>

      <ul className="mt-10 grid gap-5 sm:grid-cols-3">
        {FEATURES.map((feature) => (
          <li key={feature.title} className="surface-panel rounded-2xl p-5">
            <span className="gradient-brand mb-4 grid h-10 w-10 place-items-center rounded-xl text-primary-foreground">
              <feature.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="text-sm font-semibold text-foreground">{feature.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{feature.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          to="/movies"
          search={{}}
          className="gradient-brand inline-flex rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03]"
        >
          Browse the catalogue
        </Link>
        <Link
          to="/contact"
          className="inline-flex rounded-xl border border-border bg-secondary/60 px-5 py-3 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-primary/60"
        >
          Suggest a film
        </Link>
      </div>
    </div>
  );
}
