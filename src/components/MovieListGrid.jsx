import React from 'react'
import { useNavigate } from 'react-router-dom'


function MovieListGrid({ data }) {
    const navigate = useNavigate();
    
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {data && data.map((item) => (
                    <div
                        key={item.imdbID}
                        onClick={() => navigate(`/movie/${item.imdbID}`)}
                        className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition"
                    >
                        <img
                            src={item.Poster !== "N/A" ? item.Poster : "https://via.placeholder.com/300"}
                            alt={item.Title}
                            className="w-full h-72 object-cover"
                        />

                        <div className="p-3">
                            <h2 className="text-sm font-semibold line-clamp-2">
                                {item.Title}
                            </h2>
                            <p className="text-gray-400 text-xs">{item.Year}</p>
                        </div>
                    </div>
                ))}
            </div>
    )
}

export default MovieListGrid