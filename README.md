# React Movie Search App

A full-featured movie search application built using **React** and the **OMDB API**.
This project allows users to search for movies, view detailed information, and manage a list of favorite movies.

---

## Features

* Search movies by title
* Filter by type (movie, series, episode)
* View detailed movie information
* Add / Remove movies from Favorites
* Favorites stored using localStorage
*  Pagination support
* Loading indicator while fetching data
* Routing with React Router

---

## Tech Stack

* React (Vite)
* JavaScript (ES6+)
* Tailwind CSS
* React Router DOM
* OMDB API

---

## Project Structure

```
src/
│
├── components/
│   ├── MovieListGrid.jsx
│   ├── SearchBar.jsx
│   └── Pagination.jsx
│
├── pages/
│   ├── Search.jsx
│   ├── MovieDetails.jsx
│   └── Favorites.jsx
│
├── services/
│   └── movieService.js
│
├── App.jsx
└── main.jsx
```

---