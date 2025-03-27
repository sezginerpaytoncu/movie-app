import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <header className="app-header">
            <h1>Movie App</h1>
          </header>
          <main className="app-main">
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/movie/:imdbID" element={<MovieDetails />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App; 