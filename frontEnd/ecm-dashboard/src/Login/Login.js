import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles';
import Styles from './Styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClassBasedComponent from './ClassBasedComponent';
const useStyles = makeStyles(Styles);

const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const name = "Jaya Poojary";
    const passwords = "jay123"
    useEffect(() => {
        const auth = localStorage.getItem("currentUser");
        if(auth)
        {
          navigate('/');
        }
      })

    const handleChangeLogin = async (event) => {
        event.preventDefault();
        // try {
        //     const response = await axios.post('http://localhost:5000/login', {email,password})
        //     console.log(response.data);
        //     localStorage.setItem('loggedUser', JSON.stringify(response.data));
        //     const loggedUser = localStorage.getItem('loggedUser');
        //     console.log(localStorage.getItem('loggedUser'));
        //     if(loggedUser !== '' && loggedUser !== 'USER NOT FOUND')
        //     {
        //         navigate('/')
        //     }
        // } catch (error) {
        //     console.error('Error fetching data:', error);
        // }
        await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            resp.json().then((result) => {
                if(result.auth)
                {
                    localStorage.setItem('currentUser', JSON.stringify(result.user));
                    localStorage.setItem('token', JSON.stringify(result.auth));
                    navigate('/')
                }
                else{
                    alert("Please Enter Correct Details")
                }
            })
        }).catch((err) => {
            console.log("Error fetching API ", err);
        })
    }
    
    const messages = ["Jaya", "Poojary", "Welcome", "Greetings"];
    const [index, setIndex] = useState(0);

    const handleClick = () => {
        setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    };
  return (
    <div>
        <h1 style={{textAlign: 'center'}}>Login</h1>
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}
        className={classes.inputBox} placeholder="Please Enter Email ID" />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}
        className={classes.inputBox} placeholder="Please Enter Password" />
        <button className={classes.signupButton} onClick={handleChangeLogin}>Login</button>
        {/* {
            <ClassBasedComponent name={name} passwords={passwords} />
        } */}
        {/* <h1 onClick={handleClick}>{messages ? messages[index] : 'Hello'}</h1> */}
    </div>
  )
}

export default Login