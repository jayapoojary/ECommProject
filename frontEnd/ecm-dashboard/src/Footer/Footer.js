import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Styles from './Styles';
const useStyles = makeStyles(Styles);

const Footer = () => {
    const classes = useStyles();
  return (
    <div className={classes.divStyle}>
        E-Comm DashBoard
    </div>
  )
}

export default Footer