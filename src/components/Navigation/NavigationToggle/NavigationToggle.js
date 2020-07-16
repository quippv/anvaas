import React from "react";
import classes from "./NavigationToggle.module.css";

const NavigationToggle = (props) => {
  return (
    <div className={classes.NavigationToggle} onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default NavigationToggle;
