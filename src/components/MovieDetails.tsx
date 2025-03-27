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
    <div className="container py-4">
      <button className="btn btn-secondary mb-4" onClick={() => navigate('/')}>
        Back to Search
      </button>

      <div className="row">
        <div className="col-md-4 mb-4 mb-md-0">
          <div className="card">
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} className="card-img-top" />
          </div>
        </div>
        <div className="col-md-8">
          <h1 className="mb-4">{selectedMovie.Title}</h1>
          <div className="d-flex flex-wrap gap-2 mb-4">
            <span className="badge bg-secondary">Year: {selectedMovie.Year}</span>
            <span className="badge bg-secondary">Rated: {selectedMovie.Rated}</span>
            <span className="badge bg-secondary">Runtime: {selectedMovie.Runtime}</span>
            <span className="badge bg-secondary">IMDb Rating: {selectedMovie.imdbRating}/10</span>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Genre</h5>
                  <p className="card-text">{selectedMovie.Genre}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Director</h5>
                  <p className="card-text">{selectedMovie.Director}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Cast</h5>
                  <p className="card-text">{selectedMovie.Actors}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Plot</h5>
                  <p className="card-text">{selectedMovie.Plot}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Language</h5>
                  <p className="card-text">{selectedMovie.Language}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Country</h5>
                  <p className="card-text">{selectedMovie.Country}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Awards</h5>
                  <p className="card-text">{selectedMovie.Awards}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Box Office</h5>
                  <p className="card-text">{selectedMovie.BoxOffice}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 