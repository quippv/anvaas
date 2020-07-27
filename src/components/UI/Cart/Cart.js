import React from "react";
import { ShoppingCartOutlined } from "@material-ui/icons";
import classes from "./Cart.module.css";

const Cart = (props) => {
  return (
    <div className={classes.Cart}>
      <ShoppingCartOutlined style={{ fontSize: 16, marginRight: 5 }} />
      <p style={{ ...props.style }}>
        <span>Cart:</span> {props.quantity}
      </p>
    </div>
  );
};

export default Cart;
