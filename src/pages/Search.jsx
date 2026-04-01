import React, { useEffect, useState } from 'react';
import { searchMovies } from '../services/movieService';
import MovieListGrid from '../components/MovieListGrid';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';

function Search({ searchState, setSearchState, favorites, toggleFavorite }) {

    const { text, page, type, data, totalResults } = searchState;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const totalPages = Math.ceil(totalResults / 10);
    const navigate = useNavigate();

    async function handleSearch(currentPage = 1) {
        if (!text) {
            setSearchState(prev => ({
                ...prev,
                data: [],
                totalResults: 0
            }));
            return;
        }

        try {
            setLoading(true);
            setError("");

            const result = await searchMovies(text, currentPage, type);

            if (result.Response === "True") {
                setSearchState(prev => ({
                    ...prev,
                    data: result.Search,
                    totalResults: Number(result.totalResults)
                }));
            } else {
                setSearchState(prev => ({
                    ...prev,
                    data: [],
                    totalResults: 0
                }));
            }
        }
        catch (err) {
            setError("Something went Wrong");
        }
        finally {
            setLoading(false);
        }
    }

    function changePage(direction) {
        setSearchState(prev => {
            const newPage = prev.page + direction;
            if (newPage >= 1 && newPage <= totalPages) {
                return { ...prev, page: newPage };
            }
            return prev;
        });
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch(page);
        }, 300);

        return () => clearTimeout(timer);
    }, [text, type, page]);

    function handleTextChange(value) {
        setSearchState(prev => ({ ...prev, text: value, page: 1 }));
    }

    function handleTypeChange(value) {
        setSearchState(prev => ({ ...prev, type: value, page: 1 }));
    }

    function handleSearchClick() {
        setSearchState(prev => ({ ...prev, page: 1 }));
        handleSearch(1);
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">

            <h1 className="text-3xl font-bold text-center mb-6">
                Movie Search App
            </h1>

            <button
                onClick={() => navigate('/favorites')}
                className='mb-6 bg-red-500 px-4 py-2 rounded'
            >
                Favorites ({favorites.length})
            </button>

            <SearchBar
                text={text}
                type={type}
                onTextChange={handleTextChange}
                onTypeChange={handleTypeChange}
                onSearch={handleSearchClick}
            />

            {
                loading ? (
                    <div className="flex justify-center items-center mt-20">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <p className='text-center text-red-500'>{error}</p>
                ) : data.length === 0 && text ? (
                    <p className='text-center'>No movies found</p>
                ) : (
                    <MovieListGrid
                        data={data}
                        toggleFavorite={toggleFavorite}
                        favorites={favorites}
                    />
                )
            }

            <Pagination
                page={page}
                totalPages={totalPages}
                onPrev={() => changePage(-1)}
                onNext={() => changePage(1)}
            />
        </div>
    );
}

export default Search;