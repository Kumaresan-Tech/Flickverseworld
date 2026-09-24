import { Link } from "@tanstack/react-router";
import { Bookmark, Film, Menu, X } from "lucide-react";
import { useState } from "react";

import { SearchBar } from "@/components/SearchBar";
import { useWatchlist } from "@/hooks/useWatchlist";

const NAV_LINKS = [
  { label: "Home", to: "/" as const },
  { label: "Movies", to: "/movies" as const },
  { label: "Genres", to: "/genres" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { count } = useWatchlist();

  const linkClass =
    "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground";
  const activeProps = { className: "text-foreground" };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:gap-6">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2"
          aria-label="FlickVerse home"
        >
          <span className="gradient-brand grid h-9 w-9 shrink-0 place-items-center rounded-xl text-primary-foreground">
            <Film className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="truncate font-display text-lg font-extrabold tracking-tight text-foreground">
            Flick<span className="text-gradient-brand">Verse</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass} activeProps={activeProps}>
              {link.label}
            </Link>
          ))}
          <Link to="/" hash="trending" className={linkClass}>
            Trending
          </Link>
          <Link to="/" hash="top-rated" className={linkClass}>
            Top Rated
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <form
            className="w-56"
            onSubmit={(event) => {
              event.preventDefault();
            }}
            role="search"
          >
            <SearchBarNav query={query} setQuery={setQuery} />
          </form>
          <WatchlistLink count={count} />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <WatchlistLink count={count} />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-xl border border-border bg-secondary/60 p-2.5 text-foreground transition-colors duration-200 hover:border-primary/60"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background/95 px-4 pb-5 pt-4 lg:hidden">
          <SearchBarNav query={query} setQuery={setQuery} onNavigate={() => setOpen(false)} />
          <nav className="mt-4 grid gap-1" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-secondary/60 hover:text-foreground"
                activeProps={{ className: "bg-secondary/60 text-foreground" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/"
              hash="trending"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            >
              Trending
            </Link>
            <Link
              to="/"
              hash="top-rated"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            >
              Top Rated
            </Link>
            <Link
              to="/watchlist"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            >
              Watchlist ({count})
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function WatchlistLink({ count }: { count: number }) {
  return (
    <Link
      to="/watchlist"
      className="relative inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/60 px-3 py-2 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-primary/60"
      aria-label={`Watchlist, ${count} saved`}
    >
      <Bookmark className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">Watchlist</span>
      {count > 0 ? (
        <span className="gradient-brand grid min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold text-primary-foreground">
          {count}
        </span>
      ) : null}
    </Link>
  );
}

function SearchBarNav({
  query,
  setQuery,
  onNavigate,
}: {
  query: string;
  setQuery: (value: string) => void;
  onNavigate?: () => void;
}) {
  return (
    <div className="relative">
      <SearchBar
        id="nav-search"
        value={query}
        onChange={setQuery}
        placeholder="Search FlickVerse…"
      />
      {query.trim() ? (
        <Link
          to="/movies"
          search={{ q: query.trim() }}
          onClick={() => {
            setQuery("");
            onNavigate?.();
          }}
          className="mt-2 block rounded-xl border border-border bg-card px-3 py-2 text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          Search all movies for “{query.trim()}”
        </Link>
      ) : null}
    </div>
  );
}
