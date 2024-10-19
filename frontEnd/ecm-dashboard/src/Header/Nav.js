import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import styles from "./NavStyles";
const useStyles = makeStyles(styles);
const Nav = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const auth = localStorage.getItem("currentUser");

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div className={classes.divStyle}>
        <img src="https://i.pinimg.com/736x/c0/e5/8a/c0e58a8822f16eedf09fa0a29d57ccc0.jpg"        alt="logo"
        className="logo"
        />
      {auth ? (
        <ul className="nav-li">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>
          {/* <li>
            <Link to="/update">Update Products</Link>
          </li> */}
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-li nav-right">
          <li>
            <Link to="/signup">SignUP</Link>{" "}
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Nav;
