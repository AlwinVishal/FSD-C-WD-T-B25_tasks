import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieById } from '../services/movieService';
import MovieDetailsCard from '../components/MovieDetailsCard';

function MovieDetails({ favorites, toggleFavorite }) {
    const { id } = useParams();

    const [movieData, setMovieData] = useState(null);
    const [movieLoading, setMovieLoading] = useState(false);
    const [movieError, setMovieError] = useState("");

    async function getMovieDetails() {
        try {
            setMovieLoading(true);

            const result = await getMovieById(id);
            if (result.Response === "True") {
                setMovieData(result)
            }
            else {
                setMovieError("");
            }
        }
        catch (err) {
            setMovieError("Something went wrong");
        }
        finally {
            setMovieLoading(false);
        }
    }

    useEffect(() => {
        getMovieDetails();
    }, [id]);

    return (
        <div>
            
            {movieLoading && (
                <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {
                movieError && <h2> {movieError} </h2>
            }

            <MovieDetailsCard
                movieData={movieData}
                onToggleFavorite={toggleFavorite}
                isFavourite={favorites.some(item =>
                    item.imdbID === movieData?.imdbID
                )} />

        </div>
    )
}

export default MovieDetails