import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Styles from "./Styles";
import { registerUser } from "../API/AllApi";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Rdeux/RegisterUser/operations";
import { registerNewUser } from "../Redux2";
import {useNavigate} from 'react-router-dom';

const useStyles = makeStyles(Styles);
const SignUP = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const currentUser = useSelector(state => state.users.user);
  //const currentData = useSelector(registerNewUser.selectors.registeredUser);
  // console.log("currentUser ",currentUser);
  // console.log("currentData ",currentData);
  
  useEffect(() => {
    const auth = localStorage.getItem("currentUser");
    if(auth)
    {
      navigate('/');
    }
  })
  //console.log("currentUser ",currentUser );
  const handleSubmit = () => {
    const user = {name, email, password};
    if(name !== '' && email !== '' && password !== '')
    {
    dispatch(registerNewUser.operations.addUser(user))
    .then((resp) => {
      if(resp?.result)
      {
      if(resp)
      {
        navigate('/')
      }
      localStorage.setItem("currentUser", JSON.stringify(resp.result));
      localStorage.setItem("toke", JSON.stringify(resp.auth));
    }
    else{
      alert(resp);
    }
    });
  }
  };
  const currentUserData = localStorage.getItem("currentUser");
  
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Register</h1>
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
      <input
        className={classes.inputBox}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Enter Password"
        required
      />
      <button className={classes.signupButton} onClick={handleSubmit}>
        SignUP
      </button>
    </div>
  );
};

export default SignUP;
