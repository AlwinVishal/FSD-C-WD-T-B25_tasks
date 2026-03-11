import React from 'react';
import { FiX } from 'react-icons/fi';

function CartSidebar({ cart, isCartOpen, setIsCartOpen, handleRemove }) {
    if (!isCartOpen) return null;

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <>
            <div
                className='fixed inset-0 bg-black bg-opacity-10 z-40'
                onClick={() => setIsCartOpen(false)}
            />

            <div className='fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-bold mb-4'>
                        Cart Items
                    </h2>

                    <button
                        onClick={() => setIsCartOpen(false)}
                        className='text-red-500 hover:text-red-700 rounded-full hover:bg-gray-200 transition font-bold text-4xl p-2'
                    >
                        <FiX size={24} />
                    </button>
                </div>
                {cart.length === 0 ? (
                    <p>
                        Cart is Empty
                    </p>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className='flex items-center gap-3 border-b py-3'>
                            <img
                                src={item.image}
                                alt={item.title}
                                className='h-12 w-12 object-contain'
                            />
                            <div className='flex-1'>
                                <p className='text-sm font-semibold line-clamp-1'>
                                    {item.title}
                                </p>
                                <p className='text-green-600 font-bold'>
                                    {item.price}
                                </p>
                            </div>

                            <button
                                onClick={() => handleRemove(item.id)}
                                className='text-red-500 hover:text-red-700'
                            >
                                Remove
                            </button>
                        </div>
                    ))
                )}

                <div className='mt-4 border-t p-4'>
                    <h3 className='text-lg font-bold'>
                        Total : ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
                    </h3>
                </div>
            </div>
        </>
    )
}

export default CartSidebar