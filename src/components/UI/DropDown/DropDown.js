import React from "react";
import classes from "./DropDown.module.css";

const DropDown = (props) => {
  const classDropDown = [classes.DropDown, classes.Open];

  return <div className={classDropDown.join(" ")}>{props.children}</div>;
};

export default DropDown;
