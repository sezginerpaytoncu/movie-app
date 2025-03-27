export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}

export interface MovieState {
  movies: Movie[];
  selectedMovie: MovieDetails | null;
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  searchQuery: string;
  year: string;
  type: string;
}

export interface SearchParams {
  searchTerm: string;
  yearRelease?: string;
  type?: string;
  page?: number;
} 