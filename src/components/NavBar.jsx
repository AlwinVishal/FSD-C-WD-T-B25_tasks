import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
    const { cart } = useContext(CartContext);

    const totalItems = (cart || []).reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

            <Link to="/" className="text-xl font-bold text-blue-600">
                MyStore
            </Link>

            <div className="flex items-center gap-6">

                <Link
                    to="/"
                    className="text-gray-700 hover:text-blue-600 font-medium"
                >
                    Products
                </Link>

                <Link
                    to="/cart"
                    className="relative text-gray-700 hover:text-blue-600 font-medium"
                >
                    Cart

                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {totalItems}
                        </span>
                    )}
                </Link>

            </div>
        </nav>
    );
}

export default Navbar;