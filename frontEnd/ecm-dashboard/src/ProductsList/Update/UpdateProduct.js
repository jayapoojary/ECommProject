import React, {useState, useEffect} from 'react'
import Style from '../../AddProduct/AddProduct.Style'
import { makeStyles } from '@material-ui/styles'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getProductsList } from '../../Redux2/User/operations';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles(Style);
const UpdateProduct = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams(); //It will heps to take Value from Router. here it will take the Value of /:id
    
    console.log("productId ",id)
    const [product, setProduct] = useState();
    const [pname, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [Company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const getProduct = async () => {
        const response = await axios.get(`http://localhost:5000/product/${id}`,
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem('token'))
            }
          });
        setProduct(response.data);
        setName(response.data.pname);
        setPrice(response.data.price);
        setCategory(response.data.category);
        setCompany(response.data.Company);
    }
    useEffect(() => {
        getProduct()
    }, [])

    const handleAddProduct = async () => {
        if (!pname || !price || !category || !Company) {
          setError(true);
          return false;
        }
        const userId = JSON.parse(localStorage.getItem("currentUser"))._id;
        let Result = await fetch(`http://localhost:5000/update/${id}`, {
          method: "PUT",
          body: JSON.stringify({ pname, price, category, Company, userId }),
          headers: { "Content-Type": "application/json",
            authorization: JSON.parse(localStorage.getItem('token'))
           },
        });
        Result = await Result.json();
        console.log(Result);
        alert("Product Updated")
        dispatch(getProductsList());
        
        navigate("/")
      };

    console.log("product ", product);
  return (
    <div>
    <input
        type="text"
        value={pname}
        className={classes.inputBox}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Product Name"
      />
      
      <input
        type="text"
        value={price}
        className={classes.inputBox}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Product Price"
      />
      
      <input
        type="text"
        value={category}
        className={classes.inputBox}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter Product Category"
      />
      
      <input
        type="text"
        value={Company}
        className={classes.inputBox}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter Company"
      />
      
      <button className={classes.addButton} onClick={handleAddProduct}>
        Update Product
      </button>
    </div>
  )
}

export default UpdateProduct