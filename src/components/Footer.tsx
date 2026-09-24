import { Link } from "@tanstack/react-router";
import { Film } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card/40">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="gradient-brand grid h-9 w-9 shrink-0 place-items-center rounded-xl text-primary-foreground">
              <Film className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-extrabold text-foreground">
              Flick<span className="text-gradient-brand">Verse</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A curated corner of cinema. Browse, filter and save the films you want to watch
            next — everything runs right in your browser.
          </p>
        </div>

        <nav aria-label="Browse" className="text-sm">
          <h3 className="mb-3 font-semibold text-foreground">Browse</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/movies" className="transition-colors duration-200 hover:text-foreground">
                All movies
              </Link>
            </li>
            <li>
              <Link to="/genres" className="transition-colors duration-200 hover:text-foreground">
                Genres
              </Link>
            </li>
            <li>
              <Link
                to="/watchlist"
                className="transition-colors duration-200 hover:text-foreground"
              >
                Watchlist
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="More" className="text-sm">
          <h3 className="mb-3 font-semibold text-foreground">More</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/about" className="transition-colors duration-200 hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors duration-200 hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} FlickVerse. A demo catalogue — no streaming included.
      </div>
    </footer>
  );
}
