import { useEffect, useState } from "react";
import fetchProducts from "../services/productService";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsData = async () => {
      const data = await fetchProducts();
      if (data) {
        setProducts(data);
      }
    };
    productsData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

    </div>
  );
}

export default Products;