import React from 'react'
import MovieListGrid from '../components/MovieListGrid'
import { useNavigate } from 'react-router-dom'

function Favorites({ favorites }) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    My Favorites ({favorites.length})
                </h1>

                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-semibold"
                >
                    Back to Search
                </button>
            </div>

            {
                favorites.length === 0 ? (
                    <div className="text-center mt-20">
                        <p className="text-xl text-gray-400">
                            No favorites yet
                        </p>
                        <p className="text-gray-500 mt-2">
                            Start adding movies from search page
                        </p>
                    </div>
                ) : (
                    <MovieListGrid data={favorites} />
                )
            }

        </div>
    )
}

export default Favorites