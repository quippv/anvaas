import React from "react";
import classes from "./Card.module.css";

const Card = (props) => (
  <div
    className={classes.Card}
    style={{
      marginLeft: props.marginLeft,
      backgroundColor: props.backgroundColor,
    }}
  >
    {props.children}
  </div>
);

export default Card;
