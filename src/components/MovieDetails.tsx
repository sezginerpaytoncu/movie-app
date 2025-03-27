import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getMovieDetails, clearSelectedMovie } from '../store/moviesSlice';
import './MovieDetails.scss';

const MovieDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { imdbID } = useParams<{ imdbID: string }>();
  const { selectedMovie, loading, error } = useAppSelector((state) => state.movies);

  useEffect(() => {
    if (imdbID) {
      dispatch(getMovieDetails(imdbID));
    }

    return () => {
      dispatch(clearSelectedMovie());
    };
  }, [dispatch, imdbID]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!selectedMovie) return <div className="error">Movie not found</div>;

  return (
    <div className="movie-details">
      <button className="btn btn-secondary back-button" onClick={() => navigate('/')}>
        Back to Search
      </button>

      <div className="movie-content">
        <div className="movie-poster">
          <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
        </div>

        <div className="movie-info">
          <h1>{selectedMovie.Title}</h1>
          <div className="movie-meta">
            <span>Year: {selectedMovie.Year}</span>
            <span>Rated: {selectedMovie.Rated}</span>
            <span>Runtime: {selectedMovie.Runtime}</span>
            <span>IMDb Rating: {selectedMovie.imdbRating}/10</span>
          </div>

          <div className="movie-details-grid">
            <div className="detail-item">
              <h3>Genre</h3>
              <p>{selectedMovie.Genre}</p>
            </div>
            <div className="detail-item">
              <h3>Director</h3>
              <p>{selectedMovie.Director}</p>
            </div>
            <div className="detail-item">
              <h3>Cast</h3>
              <p>{selectedMovie.Actors}</p>
            </div>
            <div className="detail-item">
              <h3>Plot</h3>
              <p>{selectedMovie.Plot}</p>
            </div>
            <div className="detail-item">
              <h3>Language</h3>
              <p>{selectedMovie.Language}</p>
            </div>
            <div className="detail-item">
              <h3>Country</h3>
              <p>{selectedMovie.Country}</p>
            </div>
            <div className="detail-item">
              <h3>Awards</h3>
              <p>{selectedMovie.Awards}</p>
            </div>
            <div className="detail-item">
              <h3>Box Office</h3>
              <p>{selectedMovie.BoxOffice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 