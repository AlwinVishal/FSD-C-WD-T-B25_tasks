import React from 'react'

function ProductCard({ product, handleAddToCart }) {
    return (
        <div key={product.id} className='border p-4 rounded-xl shadow bg-gray-300 flex flex-col'>
            <img src={product.image} className='h-40 w-full object-contain mx-auto' />
            <h2 className='font-bold text-md mt-2 flex-grow line-clamp-2'>{product.title}</h2>
            <p className='text-green-600 font-semibold mt-2'>{product.price}</p>
            <button
                className='bg-blue-500 text-white px-4 py-2 rounded mt-3'
                onClick={() => handleAddToCart(product)}
            >
                Add To Cart
            </button>
        </div>
    )
}

export default ProductCard