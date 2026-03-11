import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

function Navbar({ cartCount, toggleCart }) {
    console.log("Cart count", cartCount)
    return (
        <div className='flex justify-between items-center bg-black text-white p-4'>
            <h1 className='text-xl font-bold'>
                My store
            </h1>
            <div className='relative cursor-pointer' onClick={toggleCart}>
                <FaShoppingCart size={24} />
                {cartCount > 0 && (
                    <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                        {cartCount}
                    </span>
                )}

            </div>
        </div>
    )
}

export default Navbar