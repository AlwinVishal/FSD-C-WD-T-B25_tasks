import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

function Navbar({ cartCount, toggleCart }) {
    return (
        <div className='flex justify-between items-center bg-black text-white p-4'>
            <h1 className='text-xl font-bold'>
                My store
            </h1>
            <div
                className='relative cursor-pointer'
                onClick={toggleCart}
            >
                <FaShoppingCart size={24} />
                <span className='absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-1 rounded-full'>
                    {cartCount}
                </span>
            </div>
        </div>
    )
}

export default Navbar