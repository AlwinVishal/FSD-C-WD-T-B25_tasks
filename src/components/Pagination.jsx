import React from 'react'

function Pagination({page, totalPages, onPrev, onNext}) {
    return (
        <div className="flex justify-center items-center gap-4 mt-8">
            <button
                onClick={onPrev}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
            >
                Prev
            </button>

            <span>
                Page {page} of {totalPages || 1}
            </span>

            <button
                onClick={onNext}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    )
}

export default Pagination