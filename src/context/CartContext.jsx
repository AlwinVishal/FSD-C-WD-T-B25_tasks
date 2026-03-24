import { createContext, useState } from "react"

export const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    function addToCart(product) {
        setCart(prev => {
            const exist = prev.find(item => item.id === product.id);
            if (exist) {
                return prev.map((item) => (
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ))
            }
            else {
                return [...prev, { ...product, quantity: 1 }];
            }
        }

        )

    }

    function removeFromCart(id) {
        setCart(prev => (
            prev.filter((item) => item.id !== id)
        ))
    }

    function increaseQuantity(id) {
        setCart(prev => (
            prev.map((item) => (
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ))
        ))
    }

    function decreaseQuantity(id) {
        setCart(prev => {
            const exist = prev.find(item => item.id === id)
            if (!exist) return prev;

            if (exist.quantity === 1) {
                return prev.filter(item => item.id !== id)
            }
            return prev.map((item) => (
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ))
        })
    }

    return (
        <CartContext.Provider value={
            { cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }
        }>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;