import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import Styles from './Styles';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const useStyles = makeStyles(Styles);

const EditUser = () => {
  const classes = useStyles();
  const {id} = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdateuser = async () => {
    try{
      const content = {name,email}
      console.log("content ",content);
      const response = await axios.put(`http://localhost:5000/updateUser/${id}`,content);
      console.log("Response "+response.data);
      return response;
    }
    catch(err)
    {
      console.log(err);
    }
  }
  return (
    <div>
        <input
        className={classes.inputBox}
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter Name"
        required
      />
      <input
        className={classes.inputBox}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Enter Email"
        required
      />
      <button className={classes.signupButton} onClick={handleUpdateuser}>
        UPDATE
      </button>
    </div>
  )
}

export default EditUser