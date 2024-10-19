import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsList, getSearchProducts } from "../Redux2/User/operations";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const dispatch = useDispatch();
  const [productsList, setProductsList] = useState([]);
  const products = useSelector((state) => state.users.products);

  const getAllProducts = async () => {
    const response = await axios.get("http://localhost:5000/getProducts", {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    setProductsList(response.data);
  };

  const deleteProduct = async (productId) => {
    const response = await axios.delete(
      `http://localhost:5000/delete/${productId}`,
      {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    dispatch(getProductsList());
  };

  const handleProductSearch = async (e) => {
    const key = e.target.value;
    if (key) {
      const response = await dispatch(getSearchProducts(key));
      setProductsList(response);
    } else {
      setProductsList(products);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div
      className="product-list"
      style={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Product List
      </h3>
      <input
        type="text"
        style={{
          marginBottom: "15px",
          width: "50%",
          height: "35px",
          textAlign: "center",
          borderRadius: "5px",
          border: "1px solid #ccc",
          padding: "5px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
        onChange={handleProductSearch}
        placeholder="Search Product"
      />
      <ul
        className="product-headers"
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "10px 0",
          backgroundColor: "#007acc",
          color: "white",
          borderRadius: "5px",
        }}
      >
        <li style={{ flex: 1, textAlign: "center" }}>S. Num</li>
        <li style={{ flex: 2, textAlign: "center" }}>Name</li>
        <li style={{ flex: 2, textAlign: "center" }}>Price</li>
        <li style={{ flex: 2, textAlign: "center" }}>Category</li>
        <li style={{ flex: 2, textAlign: "center" }}>Operation</li>
      </ul>
      {productsList?.length > 0 ? (
        productsList.map((e, index) => (
          <ul
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "10px 0",
              borderBottom: "1px solid #ccc",
            }}
          >
            <li style={{ flex: 1, textAlign: "center" }}>{index + 1}</li>
            <li style={{ flex: 2, textAlign: "center" }}>{e.pname}</li>
            <li style={{ flex: 2, textAlign: "center" }}>RS. {e.price}</li>
            <li style={{ flex: 2, textAlign: "center" }}>{e.category}</li>
            <li style={{ flex: 2, textAlign: "center" }}>
              <button
                onClick={() => deleteProduct(e._id)}
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
              <Link
                to={`/update/${e._id}`}
                style={{
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Update
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <h3 style={{ textAlign: "center", color: "#999" }}>No Products found</h3>
      )}
    </div>
  );
};

export default Products;
