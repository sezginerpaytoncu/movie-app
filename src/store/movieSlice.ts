import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MovieState, SearchParams } from '../types/movie';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
  totalResults: 0,
  currentPage: 1,
  searchQuery: 'Pokemon',
  year: '',
  type: '',
};

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async ({ s, y, type, page = 1 }: SearchParams) => {
    const params = new URLSearchParams({
      apikey: API_KEY || '',
      s,
      page: page.toString(),
      ...(y && { y }),
      ...(type && { type }),
    });

    const response = await fetch(`${BASE_URL}?${params}`);
    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error);
    }

    return data;
  }
);

export const getMovieDetails = createAsyncThunk(
  'movies/getMovieDetails',
  async (imdbID: string) => {
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
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.Search;
        state.totalResults = parseInt(action.payload.totalResults);
        state.currentPage = action.meta.arg.page || 1;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(getMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { setSearchQuery, setYear, setType, clearSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer; 