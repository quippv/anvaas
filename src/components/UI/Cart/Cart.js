import React from "react";
import { ShoppingCartOutlined } from "@material-ui/icons";
import classes from "./Cart.module.css";

const Cart = () => {
  return (
    <div className={classes.Cart}>
      <ShoppingCartOutlined style={{ fontSize: 16, marginRight: 5 }} />
      <p>
        <span>Cart:</span> 2
      </p>
    </div>
  );
};

export default Cart;
