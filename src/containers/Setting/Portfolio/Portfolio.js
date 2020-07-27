import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Portfolio.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actions from "../../../store/actions/index";

const Portfolio = React.memo((props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(actions.fetchProductPortfolio(userId));
  }, [dispatch]);

  const onBackHandler = () => {
    props.history.replace("/setting");
  };

  return (
    <div className={classes.Portfolio}>
      <p onClick={onBackHandler}>Back</p>
      <h1>Portfolio</h1>
      {loading ? (
        <Spinner />
      ) : (
        products.map((product) => (
          <div className={classes.Row}>
            <div className={classes.Left}>
              <div className={classes.Image}>
                <img src={product.imageUrl} alt="product" />
              </div>
              <div>
                <h3>{product.title}</h3>
                <h5>{product.artist}</h5>
                <p>${product.price}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
});

export default Portfolio;
