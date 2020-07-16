import React from "react";
import { Add } from "@material-ui/icons";
import productImage from "../../../assets/images/product.png";
import classes from "./Product.module.css";

const Product = () => {
  return (
    <div className={classes.Product}>
      <div className={classes.Header}>
        <p>Ryan Putnam</p>
        <h3>Run</h3>
      </div>
      <img src={productImage} alt="ProductImage" />
      <div className={classes.Footer}>
        <div className={classes.Price}>
          <p>from</p>
          <h6>255</h6>
        </div>
        <div className={classes.Add}>
          <Add style={{ textAlign: "center", fontSize: 16, color: "#fff" }} />
        </div>
      </div>
    </div>
  );
};

export default Product;
