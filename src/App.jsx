import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProducts(data);
      })
  }, [])

  function handleAddToCart(product) {
    setCart((prev) => {
      const alreadyAdded = prev.find(item => item.id === product.id);
      if (alreadyAdded) {
        alert("Item already added to the cart");
        return prev;
      }
      return [...prev, product];
    })
  }

  function handleRemove(id) {
    setCart((prev) => prev.filter(item => item.id !== id));
  }

  return (
    <>
      <Navbar cartCount={cart.length} toggleCart={() => setIsCartOpen(!isCartOpen)} />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} />
        ))}
      </div>

      <CartSidebar cart={cart} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} handleRemove={handleRemove} />
    </>
  );
}

export default App;
