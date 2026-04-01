import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from './pages/Search'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
import { useEffect, useState } from "react";

function App() {

  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(movie) {
    const exists = favorites.some((item) => item.imdbID === movie.imdbID);

    if (exists) {
      setFavorites(prev => prev.filter(item => item.imdbID !== movie.imdbID));
    } else {
      const newMovie = {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Poster: movie.Poster,
        Year: movie.Year
      };
      setFavorites(prev => [...prev, newMovie]);
    }
  }

  const [searchState, setSearchState] = useState({
    text: "",
    page: 1,
    type: "",
    data: [],
    totalResults: 0
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Search
              searchState={searchState}
              setSearchState={setSearchState}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetails
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;