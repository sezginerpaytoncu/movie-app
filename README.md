# Movie App

A React application that allows users to search and view movie details using the OMDb API.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Change the name `.env.example` file to `.env`
4. Add the OMDb API key to the `.env` file in the root directory (It should not be pushed to repo, added for easy setup)
   ```
   REACT_APP_OMDB_API_KEY=your_api_key_here
   ```
5. Start the development server:
   ```bash
   npm start

## Features

- Search movies by title
- Filter by year and type (Movie, TV Series, Episode)
- View detailed movie information
- Responsive design
- Pagination support
   ```

## API Reference

This project uses the [OMDb API](http://www.omdbapi.com/). Get your API key at [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx).

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- React Router
- SCSS
- Bootstrap