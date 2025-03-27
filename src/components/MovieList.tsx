import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { searchMovies, setSearchQuery, setYear, setType } from '../store/movieSlice';
import { Movie } from '../types/movie';
import './MovieList.scss';

const MovieList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { movies, loading, error, totalResults, currentPage, searchQuery, year, type } = useAppSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(searchMovies({ s: searchQuery, y: year, type, page: currentPage }));
  }, [dispatch, searchQuery, year, type, currentPage]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    dispatch(setSearchQuery(formData.get('search') as string));
    dispatch(setYear(formData.get('year') as string));
    dispatch(setType(formData.get('type') as string));
  };

  const handleMovieClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movie-list">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          name="search"
          defaultValue={searchQuery}
          placeholder="Search movies..."
          className="form-control"
        />
        <input
          type="text"
          name="year"
          defaultValue={year}
          placeholder="Year (optional)"
          className="form-control"
        />
        <select name="type" defaultValue={type} className="form-control">
          <option value="">All Types</option>
          <option value="movie">Movies</option>
          <option value="series">TV Series</option>
          <option value="episode">TV Episodes</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      <div className="movie-grid">
        {movies.map((movie: Movie) => (
          <div
            key={movie.imdbID}
            className="movie-card"
            onClick={() => handleMovieClick(movie.imdbID)}
          >
            <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
            <div className="movie-info">
              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>
              <p>IMDb ID: {movie.imdbID}</p>
            </div>
          </div>
        ))}
      </div>

      {totalResults > 0 && (
        <div className="pagination">
          <button
            className="btn btn-secondary"
            disabled={currentPage === 1}
            onClick={() => dispatch(searchMovies({ s: searchQuery, y: year, type, page: currentPage - 1 }))}
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {Math.ceil(totalResults / 10)}
          </span>
          <button
            className="btn btn-secondary"
            disabled={currentPage >= Math.ceil(totalResults / 10)}
            onClick={() => dispatch(searchMovies({ s: searchQuery, y: year, type, page: currentPage + 1 }))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList; 