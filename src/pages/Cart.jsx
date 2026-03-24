import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const discount = total * 0.1;
  const finalAmount = total - discount;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow flex gap-4 items-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 object-contain"
                />

                <div className="flex-1">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-gray-500">₹{item.price}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity === 1}
                      className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>

                <h4 className="font-semibold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </h4>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl shadow h-fit">
            <h3 className="text-lg font-semibold mb-4">Summary</h3>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-2 text-green-600">
              <span>Discount</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{finalAmount.toFixed(2)}</span>
            </div>

            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
              Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;