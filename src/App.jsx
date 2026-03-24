import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/cart";
import Navbar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        
        <Navbar />

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;