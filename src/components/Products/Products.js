import React from "react";
import Product from "./Product/Product";
import classes from "./Products.module.css";

const Products = () => {
  return (
    <div className={classes.Products}>
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
    </div>
  );
};

export default Products;
