import { createFileRoute } from "@tanstack/react-router";

import { GenreTile } from "@/components/GenreTile";
import { GENRES, MOVIES } from "@/data/movies";

export const Route = createFileRoute("/genres")({
  head: () => ({
    meta: [
      { title: "Genres — FlickVerse" },
      {
        name: "description",
        content:
          "Jump straight into sci-fi, thrillers, animation, drama and more. Every genre tile opens a filtered view of the catalogue.",
      },
      { property: "og:title", content: "Genres — FlickVerse" },
      {
        property: "og:description",
        content: "Explore the FlickVerse catalogue one genre at a time.",
      },
    ],
  }),
  component: GenresPage,
});

function GenresPage() {
  const tiles = GENRES.map((genre) => {
    const inGenre = MOVIES.filter((movie) => movie.genres.includes(genre));
    const sample = [...inGenre].sort((a, b) => b.rating - a.rating)[0];
    return { genre, count: inGenre.length, sample };
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Genres</h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Pick a mood. Each tile opens the movies page already filtered for you.
        </p>
      </header>

      <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tiles.map((tile) => (
          <li key={tile.genre}>
            <GenreTile genre={tile.genre} count={tile.count} sample={tile.sample} />
          </li>
        ))}
      </ul>
    </div>
  );
}
