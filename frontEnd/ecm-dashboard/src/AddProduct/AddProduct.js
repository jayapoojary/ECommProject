import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Styles from "./AddProduct.Style";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { getProductsList } from "../Redux2/User/operations";
const useStyles = makeStyles(Styles);
const AddProduct = () => {
  const dispatch = useDispatch();
  
  const classes = useStyles();
  const [pname, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [Company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const handleAddProduct = async () => {
    if (!pname || !price || !category || !Company) {
      setError(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem("currentUser"))._id;
    let Result = await fetch("http://localhost:5000/addproduct", {
      method: "POST",
      body: JSON.stringify({ pname, price, category, Company, userId }),
      headers: { 
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem('token'))
      },
    });
    Result = await Result.json();
    console.log(Result);
    dispatch(getProductsList());
  };

  useEffect(() => {
    const getCurrentUserProduct = async () => {
        const response = await axios.post('')
    }
  })
  return (
    <div>
      <input
        type="text"
        value={pname}
        className={classes.inputBox}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Product Name"
      />
      {error && !pname && (
        <span
          style={{
            color: "red",
            marginLeft: "450px",
            fontSize: "10px",
            display: "block",
          }}
        >
          Enter Valid Name
        </span>
      )}
      <input
        type="text"
        value={price}
        className={classes.inputBox}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Product Price"
      />
      {error && !price && (
        <span
          style={{
            color: "red",
            marginLeft: "450px",
            fontSize: "10px",
            display: "block",
          }}
        >
          Enter Valid Price
        </span>
      )}
      <input
        type="text"
        value={category}
        className={classes.inputBox}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter Product Category"
      />
      {error && !category && (
        <span
          style={{
            color: "red",
            marginLeft: "450px",
            fontSize: "10px",
            display: "block",
          }}
        >
          Enter Valid Category
        </span>
      )}
      <input
        type="text"
        value={Company}
        className={classes.inputBox}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter Company"
      />
      {error && !Company && (
        <span
          style={{
            color: "red",
            marginLeft: "450px",
            fontSize: "10px",
            display: "block",
          }}
        >
          Enter Valid Company Name
        </span>
      )}
      <button className={classes.addButton} onClick={handleAddProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
