import React, {  useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';




function ProductDetail({ product }) {
  const { id } = useParams();

  console.log(typeof id);

  const routesId = parseInt(id);

  console.log(typeof routesId, "routeId");

  let prod = product.find((each) => each.id === routesId);

  console.log(prod, "prod");

  // if (loading) {
  //     return (
  //         <h1 className="text-center mt-5">Loading...</h1>
  //     );
  // }
  const navigate = useNavigate()

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Product Detail</h1>

        <div className="row">
          <div className="col-md-5">
            <img
              src={prod.image}
              className="img-fluid"
              alt={prod.title}
              style={{ maxHeight: "300px", objectFit: "contain" }}
            />
          </div>

          <div className="col-md-7">
            <h3>{prod.title}</h3>
            <p className="text-muted">{prod.category}</p>
            <h4 className="text-success">${prod.price}</h4>
            <p>{prod.description}</p>

            <div className="d-flex  mt-4">
              <button className="btn btn-warning btn-lg  me-5">
                Add to Cart
              </button>
              <button className="btn btn-success btn-lg me-4 ">Buy Now</button>
            <button onClick={() => navigate("/products")} 
              className="btn btn-primary  btn-lg me-5">Go to Home</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
