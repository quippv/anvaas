import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Toolbar from "../../components/Toolbar/Toolbar";
import classes from "./Purchase.module.css";
import * as actions from "../../store/actions/index";

const Purchase = (props) => {
  const orders = useSelector((state) => state.order.orders);
  const peoples = useSelector((state) => state.people.peoples[0]);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    peoples && dispatch(actions.initOrder(token, peoples.id));
  }, [dispatch, peoples]);

  const gotoHomeHandler = () => {
    props.history.push("/");
  };

  const signInHandler = () => {
    props.history.push("/auth");
  };

  const signUpHandler = () => {
    props.history.push("/register");
  };

  return (
    <React.Fragment>
      <Toolbar
        notMain="true"
        gotoHomeHandler={gotoHomeHandler}
        signIn={signInHandler}
        signUp={signUpHandler}
      />
      <main className={classes.Purchase}>
        <h1>Your Order</h1>
        {orders.map((order) => (
          <div className={classes.Row}>
            <div className={classes.Left}>
              <div className={classes.Image}>
                <img src={order.products.imageUrl} alt="product" />
              </div>
              <div>
                <h3>{order.products.title}</h3>
                <h5>{order.products.artist}</h5>
                <p>${order.products.price}</p>
              </div>
            </div>
            <div className={classes.Right}>
              <h6>Address :</h6>
              <p>{order.address}</p>
            </div>
          </div>
        ))}
      </main>
    </React.Fragment>
  );
};

export default Purchase;
