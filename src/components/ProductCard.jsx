import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col">

      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mb-4"
      />

      <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
        {product.title}
      </h2>

      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
        {product.description}
      </p>

      <p className="text-xl font-bold text-gray-900 mt-3">
        ₹{product.price}
      </p>

      <button
        onClick={() =>
          isInCart
            ? removeFromCart(product.id)
            : addToCart(product)
        }
        className={`mt-auto py-2 px-4 rounded-xl font-medium transition ${
          isInCart
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isInCart ? "Remove" : "Add to Cart"}
      </button>

    </div>
  );
}

export default ProductCard;