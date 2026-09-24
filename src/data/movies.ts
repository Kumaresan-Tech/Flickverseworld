export type Movie = {
  id: string;
  title: string;
  year: number;
  rating: number;
  genres: string[];
  duration: number; // minutes
  director: string;
  cast: string[];
  description: string;
  poster: string;
  backdrop: string;
  trailerUrl: string;
};

const img = (path: string, size = "w500") => `https://image.tmdb.org/t/p/${size}${path}`;
const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;

const make = (
  m: Omit<Movie, "poster" | "backdrop"> & { file: string },
): Movie => ({
  ...m,
  poster: img(m.file, "w500"),
  backdrop: img(m.file, "w1280"),
});

export const MOVIES: Movie[] = [
  make({
    id: "inception",
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genres: ["Sci-Fi", "Action", "Thriller"],
    duration: 148,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea in the mind of a C.E.O.",
    file: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    trailerUrl: yt("YoHD9XEInc0"),
  }),
  make({
    id: "interstellar",
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
    genres: ["Sci-Fi", "Drama", "Adventure"],
    duration: 169,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Mackenzie Foy"],
    description:
      "With Earth's future foreclosed by blight, a former pilot leads an expedition through a wormhole in search of a new home for humanity.",
    file: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    trailerUrl: yt("zSWdZVtXT7E"),
  }),
  make({
    id: "the-dark-knight",
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genres: ["Action", "Crime", "Drama"],
    duration: 152,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Gary Oldman"],
    description:
      "Batman raises the stakes in his war on crime until a rising anarchist known as the Joker forces him to confront the cost of being a symbol.",
    file: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    trailerUrl: yt("EXeTwQWrcwY"),
  }),
  make({
    id: "parasite",
    title: "Parasite",
    year: 2019,
    rating: 8.5,
    genres: ["Thriller", "Drama", "Comedy"],
    duration: 132,
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between a wealthy family and a destitute clan.",
    file: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    trailerUrl: yt("5xH0HfJHsaY"),
  }),
  make({
    id: "dune",
    title: "Dune",
    year: 2021,
    rating: 8.0,
    genres: ["Sci-Fi", "Adventure", "Drama"],
    duration: 155,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Zendaya", "Oscar Isaac"],
    description:
      "A gifted heir travels to the most dangerous planet in the universe to secure the future of his family and his people.",
    file: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    trailerUrl: yt("8g18jFHCLXk"),
  }),
  make({
    id: "blade-runner-2049",
    title: "Blade Runner 2049",
    year: 2017,
    rating: 8.0,
    genres: ["Sci-Fi", "Mystery", "Drama"],
    duration: 164,
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas", "Sylvia Hoeks"],
    description:
      "A young blade runner unearths a long-buried secret that leads him to track down a former colleague who vanished thirty years ago.",
    file: "/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    trailerUrl: yt("gCcx85zbxz4"),
  }),
  make({
    id: "mad-max-fury-road",
    title: "Mad Max: Fury Road",
    year: 2015,
    rating: 8.1,
    genres: ["Action", "Adventure", "Sci-Fi"],
    duration: 120,
    director: "George Miller",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult", "Hugh Keays-Byrne"],
    description:
      "In a desert wasteland, a drifter and a renegade commander flee a tyrant across a howling stretch of road in search of a green place.",
    file: "/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    trailerUrl: yt("hEJnMQG9ev8"),
  }),
  make({
    id: "spirited-away",
    title: "Spirited Away",
    year: 2001,
    rating: 8.6,
    genres: ["Animation", "Fantasy", "Adventure"],
    duration: 125,
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki", "Takashi Naitо"],
    description:
      "A sullen ten-year-old wanders into a world of spirits and must work in a bathhouse to free her parents and find her way home.",
    file: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    trailerUrl: yt("ByXuk9QqQkk"),
  }),
  make({
    id: "the-matrix",
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    genres: ["Sci-Fi", "Action"],
    duration: 136,
    director: "Lana Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"],
    description:
      "A hacker learns that his reality is a simulation and joins a rebellion against the machines that built it.",
    file: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    trailerUrl: yt("vKQi3bBA1y8"),
  }),
  make({
    id: "whiplash",
    title: "Whiplash",
    year: 2014,
    rating: 8.5,
    genres: ["Drama", "Music"],
    duration: 106,
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons", "Paul Reiser", "Melissa Benoist"],
    description:
      "A promising young drummer enrolls at a cut-throat conservatory where an instructor will stop at nothing to realize a student's potential.",
    file: "/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    trailerUrl: yt("7d_jQycdQGo"),
  }),
  make({
    id: "get-out",
    title: "Get Out",
    year: 2017,
    rating: 7.8,
    genres: ["Horror", "Thriller", "Mystery"],
    duration: 104,
    director: "Jordan Peele",
    cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford", "Catherine Keener"],
    description:
      "A weekend visit to his girlfriend's family estate turns into a nightmare a young photographer never could have imagined.",
    file: "/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
    trailerUrl: yt("DzfpyUB60YY"),
  }),
  make({
    id: "la-la-land",
    title: "La La Land",
    year: 2016,
    rating: 8.0,
    genres: ["Romance", "Drama", "Music"],
    duration: 128,
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone", "John Legend", "Rosemarie DeWitt"],
    description:
      "A jazz pianist and an aspiring actress fall in love while chasing their dreams through a city that rewards almost nobody.",
    file: "/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    trailerUrl: yt("0pdqf4P9MB8"),
  }),
  make({
    id: "everything-everywhere",
    title: "Everything Everywhere All at Once",
    year: 2022,
    rating: 7.9,
    genres: ["Sci-Fi", "Comedy", "Adventure"],
    duration: 139,
    director: "Daniel Kwan",
    cast: ["Michelle Yeoh", "Ke Huy Quan", "Stephanie Hsu", "Jamie Lee Curtis"],
    description:
      "An exhausted laundromat owner discovers she must connect with parallel-universe versions of herself to stop a cosmic collapse.",
    file: "/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    trailerUrl: yt("wxN1T1uxQ2g"),
  }),
  make({
    id: "oppenheimer",
    title: "Oppenheimer",
    year: 2023,
    rating: 8.4,
    genres: ["Drama", "History", "Thriller"],
    duration: 181,
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr.", "Matt Damon"],
    description:
      "The story of the physicist whose work on the atomic bomb changed the world and then consumed the man who built it.",
    file: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    trailerUrl: yt("uYPbbksJxIg"),
  }),
  make({
    id: "into-the-spider-verse",
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    rating: 8.4,
    genres: ["Animation", "Action", "Adventure"],
    duration: 117,
    director: "Bob Persichetti",
    cast: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld", "Mahershala Ali"],
    description:
      "Teenager Miles Morales becomes Spider-Man and teams with heroes from other dimensions to save every reality at once.",
    file: "/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    trailerUrl: yt("g4Hbz2jLxvQ"),
  }),
  make({
    id: "arrival",
    title: "Arrival",
    year: 2016,
    rating: 7.9,
    genres: ["Sci-Fi", "Drama", "Mystery"],
    duration: 116,
    director: "Denis Villeneuve",
    cast: ["Amy Adams", "Jeremy Renner", "Forest Whitaker", "Michael Stuhlbarg"],
    description:
      "A linguist is recruited to communicate with visitors whose language rewrites how she experiences time itself.",
    file: "/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
    trailerUrl: yt("tFMo3UJ4B4g"),
  }),
  make({
    id: "joker",
    title: "Joker",
    year: 2019,
    rating: 8.3,
    genres: ["Crime", "Drama", "Thriller"],
    duration: 122,
    director: "Todd Phillips",
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz", "Frances Conroy"],
    description:
      "A failed comedian drifts through a decaying city until a series of humiliations pushes him toward a violent reinvention.",
    file: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    trailerUrl: yt("zAGVQLHvwOY"),
  }),
  make({
    id: "knives-out",
    title: "Knives Out",
    year: 2019,
    rating: 7.9,
    genres: ["Mystery", "Comedy", "Crime"],
    duration: 130,
    director: "Rian Johnson",
    cast: ["Daniel Craig", "Ana de Armas", "Chris Evans", "Jamie Lee Curtis"],
    description:
      "A private detective investigates the death of a wealthy novelist and finds a household of relatives with plenty to hide.",
    file: "/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
    trailerUrl: yt("qGqiHJTsRkQ"),
  }),
  make({
    id: "grand-budapest-hotel",
    title: "The Grand Budapest Hotel",
    year: 2014,
    rating: 8.1,
    genres: ["Comedy", "Drama", "Adventure"],
    duration: 99,
    director: "Wes Anderson",
    cast: ["Ralph Fiennes", "Tony Revolori", "Adrien Brody", "Saoirse Ronan"],
    description:
      "A legendary concierge and his loyal lobby boy become entangled in a stolen painting and a battle over a vast family fortune.",
    file: "/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    trailerUrl: yt("1Fg5iWmQjwk"),
  }),
  make({
    id: "coco",
    title: "Coco",
    year: 2017,
    rating: 8.4,
    genres: ["Animation", "Fantasy", "Music"],
    duration: 105,
    director: "Lee Unkrich",
    cast: ["Anthony Gonzalez", "Gael García Bernal", "Benjamin Bratt", "Alanna Ubach"],
    description:
      "A boy who dreams of music is swept into the Land of the Dead, where he uncovers the truth behind his family's oldest rule.",
    file: "/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
    trailerUrl: yt("Ga6RYejo6Hk"),
  }),
  make({
    id: "gladiator",
    title: "Gladiator",
    year: 2000,
    rating: 8.5,
    genres: ["Action", "Drama", "History"],
    duration: 155,
    director: "Ridley Scott",
    cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen", "Oliver Reed"],
    description:
      "A betrayed Roman general rises through the arena, seeking vengeance against the emperor who murdered his family.",
    file: "/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    trailerUrl: yt("owK1qxDselE"),
  }),
  make({
    id: "se7en",
    title: "Se7en",
    year: 1995,
    rating: 8.6,
    genres: ["Crime", "Mystery", "Thriller"],
    duration: 127,
    director: "David Fincher",
    cast: ["Brad Pitt", "Morgan Freeman", "Gwyneth Paltrow", "Kevin Spacey"],
    description:
      "Two detectives hunt a killer who stages his murders around the seven deadly sins in a city that never stops raining.",
    file: "/6yoghtyTpznpBik8EngEmJskVUO.jpg",
    trailerUrl: yt("znmZoVkCVpg"),
  }),
];

export const GENRES: string[] = Array.from(
  new Set(MOVIES.flatMap((m) => m.genres)),
).sort();

export const YEARS: number[] = Array.from(new Set(MOVIES.map((m) => m.year))).sort(
  (a, b) => b - a,
);

export const getMovieById = (id: string) => MOVIES.find((m) => m.id === id);

export const TRENDING = MOVIES.filter((m) => m.year >= 2016).slice(0, 10);

export const TOP_RATED = [...MOVIES].sort((a, b) => b.rating - a.rating).slice(0, 10);

export const FEATURED = MOVIES[0]!;

export const POSTER_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a1420"/><stop offset="1" stop-color="#0b0b0f"/></linearGradient></defs><rect width="500" height="750" fill="url(#g)"/><text x="50%" y="50%" fill="#8b8b96" font-family="sans-serif" font-size="28" text-anchor="middle">Poster unavailable</text></svg>`,
  );

export const youTubeId = (url: string) => url.split("v=")[1] ?? "";
