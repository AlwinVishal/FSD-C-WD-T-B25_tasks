// export async function searchMovies(text, page, type) {
//     const url = `https://www.omdbapi.com/?apikey=bde42da6&s=${text}&page=${page}&type=${type}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
// }

// export async function getMovieById(id) {
//     const url = `https://www.omdbapi.com/?apikey=bde42da6&i=${id}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
// }

import axios from "axios";

export async function searchMovies(text, page, type) {
    const url = `https://www.omdbapi.com/?apikey=bde42da6&s=${text}&page=${page}&type=${type}`;
    const response = await axios.get(url);
    return response.data;
}

export async function getMovieById(id) {
    const url = `https://www.omdbapi.com/?apikey=bde42da6&i=${id}`
    const response = await axios.get(url);
    return response.data;
}