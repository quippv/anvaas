import React from "react";
import { Link } from "react-router-dom";

import classes from "./Carts.module.css";
import { DeleteOutline, ShoppingCart } from "@material-ui/icons";

const Carts = (props) => {
  return (
    <div className={classes.Carts}>
      <div className={classes.CartsLeft}>
        <div className={classes.Image}>
          <img src={props.imageUrl} alt="product" />
        </div>
        <Link
          to={`/detail-product/${props.id}`}
          className={classes.Information}
        >
          <h3>{props.title}</h3>
          <h5>{props.artist}</h5>
          <p>${props.price}</p>
        </Link>
      </div>
      <div className={classes.CartsRight}>
        <div
          onClick={props.remove}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <DeleteOutline
            style={{
              fontSize: 24,
              color: "rgba(0, 0, 0, 0.48)",
            }}
          />
          <p>Remove</p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: 10,
            cursor: "pointer",
          }}
          onClick={props.buy}
        >
          <ShoppingCart
            style={{
              fontSize: 24,
              color: "#b022b9",
            }}
          />
          <p>{props.buyDetail}</p>
        </div>
      </div>
    </div>
  );
};

export default Carts;
