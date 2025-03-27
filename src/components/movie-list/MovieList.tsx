import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchMovies, setSearchQuery, setYear, setType } from '../../store/moviesSlice';
import { Movie } from '../../types/movie';
import './MovieList.scss';

const MovieList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { movies, loading, error, totalResults, currentPage, searchQuery, year, type } = useAppSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(searchMovies({ searchTerm: searchQuery, yearRelease: year, type, page: currentPage }));
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
    <div className="container py-4">
      <form onSubmit={handleSearch} className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Search movies..."
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="year"
            defaultValue={year}
            placeholder="Year (optional)"
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <select name="type" defaultValue={type} className="form-select">
            <option value="">All Types</option>
            <option value="movie">Movies</option>
            <option value="series">TV Series</option>
            <option value="episode">TV Episodes</option>
          </select>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            Search
          </button>
        </div>
      </form>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {movies.map((movie: Movie) => (
          <div key={movie.imdbID} className="col">
            <div className="card h-100" onClick={() => handleMovieClick(movie.imdbID)}>
              <img src={movie.Poster} alt={movie.Title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">
                  <small className="text-muted">Year: {movie.Year}</small>
                </p>
                <p className="card-text">
                  <small className="text-muted">IMDb ID: {movie.imdbID}</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalResults > 0 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
          <button
            className="btn btn-secondary"
            disabled={currentPage === 1}
            onClick={() => dispatch(searchMovies({ searchTerm: searchQuery, yearRelease: year, type, page: currentPage - 1 }))}
          >
            Previous
          </button>
          <span className="text-muted">
            Page {currentPage} of {Math.ceil(totalResults / 10)}
          </span>
          <button
            className="btn btn-secondary"
            disabled={currentPage >= Math.ceil(totalResults / 10)}
            onClick={() => dispatch(searchMovies({ searchTerm: searchQuery, yearRelease: year, type, page: currentPage + 1 }))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList; 