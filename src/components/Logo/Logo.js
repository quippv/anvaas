import React from "react";
import logoImage from "../../assets/images/logo.png";
import classes from "./Logo.module.css";

const Logo = (props) => {
  return (
    <img
      className={classes.Logo}
      src={logoImage}
      alt="logo"
      style={{ ...props.style }}
      onClick={props.clicked}
    />
  );
};

export default Logo;
