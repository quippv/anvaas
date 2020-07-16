import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const classBtn = [classes.Button, classes[props.btnType]];

  return (
    <button
      className={classBtn.join(" ")}
      onClick={props.clicked}
      style={{ ...props.style }}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
