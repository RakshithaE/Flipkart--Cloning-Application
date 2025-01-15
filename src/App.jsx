import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./Products";
import Login from "./Login"; // Use uppercase "Login"
import ProductDetail from "./ProductDetail";
import Register from "./Register";

import "./styles.css";


function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add isLoggedIn state

  const fetchdata = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> {/* Fix case and pass setIsLoggedIn */}
       
             <Route
          path="/products"
          element={isLoggedIn ? <Products test={products} loading={loading} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/products/:id"
          element={isLoggedIn ? <ProductDetail product={products} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
