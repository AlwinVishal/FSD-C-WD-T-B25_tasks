import React from 'react'

function SearchBar({ text, type, onTextChange, onTypeChange, onSearch }) {
    return (
        <div className="max-w-3xl mx-auto mb-6 flex flex-col sm:flex-row gap-4">
            <input
                type="text"
                placeholder="Search movies..."
                value={text}
                onChange={(e) => onTextChange(e.target.value)}
                className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
            />

            <select
                value={type}
                onChange={(e) => onTypeChange(e.target.value)}
                className="p-3 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-900"
            >
                <option value="">All</option>
                <option value="movie">Movies</option>
                <option value="series">Series</option>
                <option value="episode">Episode</option>
            </select>

            <button
                onClick={onSearch}
                className="bg-blue-600 px-5 py-3 rounded-lg hover:bg-blue-700 w-1/4 sm:w-auto"
            >
                Search
            </button>
        </div>
    )
}

export default SearchBar