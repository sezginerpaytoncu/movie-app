import { Movie, MovieDetails, SearchParams } from '../types/movie';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_OMDB_API_URL;

interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export async function searchMovies({ searchTerm, yearRelease, type, page = 1 }: SearchParams): Promise<SearchResponse> {
  const params = new URLSearchParams({
    apikey: API_KEY || '',
    s: searchTerm,
    page: page.toString(),
    ...(yearRelease && { y: yearRelease }),
    ...(type && { type }),
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  const data = await response.json();

  if (data.Response === 'False') {
    throw new Error(data.Error);
  }

  return data;
}

export async function getMovieDetails(imdbID: string): Promise<MovieDetails> {
  const params = new URLSearchParams({
    apikey: API_KEY || '',
    i: imdbID,
    plot: 'full',
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  const data = await response.json();

  if (data.Response === 'False') {
    throw new Error(data.Error);
  }

  return data;
} 