import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Products(props) {
  const products = props.test;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [notFound, setNotFound] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
      setNotFound(false);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setNotFound(filtered.length === 0);
    }
  }, [searchTerm, products]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.title} added to cart!`);
    // navigate("/cart"); // Navigate to the cart page
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid" style={{ backgroundColor :"blue"}}>
          <Link className="navbar-brand" to="/">
            <img
              src="https://seeklogo.com/images/F/flipkart-logo-C9E637A758-seeklogo.com.png"
              alt="Logo"
              style={{ width: "40px" }}
            />
            FlipKart
          </Link>
          <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-danger" type="submit" style={{backgroundColor :"white"}}>
              Search
            </button>
          </form>
          <Link className="btn btn-outline-danger ms-2" to="/login" style={{backgroundColor :"white"}}>
            Login
          </Link>
          <Link className="btn btn-outline-danger ms-2" to="/cart"  style={{backgroundColor :"white"}}>
            Cart ({cart.length})
          </Link>
          <button
            onClick={() => navigate("/")}
            className="btn btn-primary mb-2"
            style={{backgroundColor :"red"}}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container">
        <h1 className="text-center">Products</h1>

        {notFound && (
          <h3 className="text-danger text-center">Product not found</h3>
        )}

        <div className="row">
          {filteredProducts.map((product, index) => (
            <div key={index} className="col-3 mb-4">
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                <div>
                  <img
                    src={product.image}
                    style={{ width: "200px", height: "200px" }}
                    alt={product.title}
                  />
                </div>
                <Link to={`/products/${product.id}`}>
                  {product.title.length > 25
                    ? `${product.title.substring(0, 25)}...`
                    : product.title}
                </Link>

                <h3>${product.price}</h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <button
                    className="btn btn-warning"
                    style={{ flex: "1", marginRight: "5px" }}
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button className="btn btn-success" style={{ flex: "1" }}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
