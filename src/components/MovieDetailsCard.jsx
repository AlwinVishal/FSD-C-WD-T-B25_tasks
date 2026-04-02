import React from 'react'
import { useNavigate } from 'react-router-dom'

function MovieDetailsCard({ movieData, onToggleFavorite, isFavourite }) {
    const navigate = useNavigate();
    
    return (
        <div>
            {
                movieData && (
                    <div className="min-h-screen bg-gray-900 text-white p-6">
                        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">

                            <img
                                src={movieData.Poster}
                                alt={movieData.Title}
                                className="w-full md:w-1/3 rounded-lg shadow-lg"
                            />

                            <div className="flex-1">
                                <h1 className="text-3xl font-bold mb-2">{movieData.Title}</h1>
                                <p className="text-gray-400 mb-4">{movieData.Year}</p>

                                <p className="mb-4">{movieData.Plot}</p>

                                <p><span className="font-semibold">Genre:</span> {movieData.Genre}</p>
                                <p><span className="font-semibold">Actors:</span> {movieData.Actors}</p>
                                <p><span className="font-semibold">IMDB:</span>
                                    &nbsp; <i className="fa-solid fa-star text-yellow-400 mr-2"></i>
                                    {movieData.imdbRating}</p>

                                <button
                                    className='bg-red-800 px-4 py-2 rounded mt-5'
                                    onClick={() => onToggleFavorite(movieData)}
                                >
                                    {isFavourite ? "Remove from Favourites" : "Add to Favorites"}
                                </button>

                                <button
                                    onClick={() => navigate('/favorites')}
                                    className='mt-6 bg-red-800 px-4 py-2 rounded ml-5'
                                >
                                    Go to Favorites
                                </button>
                            </div>

                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default MovieDetailsCard