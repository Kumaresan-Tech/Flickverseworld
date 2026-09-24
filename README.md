# FlickVerse Explorer

Build FlickVerse: a premium, responsive, frontend-only movie discovery web app. No backend, auth, payments, or external APIs — all data local.

Stack: React + TypeScript + Tailwind + React Router + shadcn/ui + Lucide icons + localStorage. No other deps.

Design: Dark cinematic UI — near-black bg (#0B0B0F), red→purple gradient accent (#E11D48→#7C3AED) for CTAs/ratings, white/gray text, rounded movie cards with hover glow, generous spacing, subtle 150–250ms transitions. No clutter.

Data: One TS file, 20–25 movies: `id, title, year, rating, genres[], duration, director, cast[], description, poster, backdrop, trailerUrl`. Real placeholder images + real YouTube trailer links. Image `onError` fallback required.

Routes:

`/` Home — navbar, hero (title/rating/year/genre/desc + Watch Trailer + Explore buttons), Trending row, Top Rated row, genre chips, footer

`/movies` — search + filter (genre/year/rating) + sort (rating/year) + grid

`/movies/:id` — backdrop, poster, full details, trailer modal, watchlist toggle, related movies (same genre)

`/genres` — genre tile grid → filters Movies page

`/watchlist` — saved movies grid; nice empty state

`/about` — short blurb

`/contact` — form (name/email/subject/message), client-side validation, success state, no backend

Navbar: Logo + Home/Movies/Genres/Trending/Top Rated/Watchlist/About/Contact, search input, watchlist count badge, mobile hamburger drawer, sticky.

Components: Navbar, Footer, Hero, MovieCard, MovieGrid, SearchBar, FilterBar, TrailerModal, GenreTile, EmptyState — reusable, no duplication.

Must work: search (title/actor/director/genre), combinable filters, sort, details routing, related movies, trailer modal, add/remove watchlist (card + details), watchlist persists on refresh, mobile menu, validated contact form with success + reset.

Performance: lazy-load images, memoize filtered/sorted lists, `useWatchlist` hook for localStorage logic, filtering logic in a utility file, no dead code/placeholder text.

Responsive/A11y: no horizontal scroll/overlap at any breakpoint, grid reflows 1→2-3→4-5 cols, semantic HTML, alt text, keyboard focus states, good contrast.

Out of scope: auth, database, payments, admin panel, real streaming/downloads, live movie API, AI recommendations.

Priority: functionality → responsiveness → performance → polish.

Verify before done: all routes render, search+filter+sort combine correctly, watchlist survives refresh, mobile menu works, contact form validates, images fallback, zero horizontal overflow.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://flickverseworld.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cf5c7731-990f-4bc8-9d06-a6b9269423ba).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
