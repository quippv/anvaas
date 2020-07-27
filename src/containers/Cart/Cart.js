import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import Toolbar from "../../components/Toolbar/Toolbar";
import classes from "./Cart.module.css";
import Carts from "../../components/Carts/Carts";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import ContactData from "./ContactData/ContactData";

const Cart = (props) => {
  const { onCartInit, peoples, token, isAuthenticated } = props;

  useEffect(() => {
    peoples && isAuthenticated && onCartInit(token, peoples.id);
  }, [onCartInit, peoples, token, isAuthenticated]);

  const gotoHomeHandler = () => {
    props.history.push("/");
  };

  const gotoSignInHandler = () => {
    props.history.push("/auth");
  };

  const gotoSignUpHandler = () => {
    props.history.push("/register");
  };

  const cartRemoveHandler = (event, id) => {
    props.onCartRemove(token, peoples.id, id);
  };

  const cartBuyHandler = (event, id) => {
    props.history.replace(`/cart/contact-data/${id}`);
  };

  let route = null;
  if (isAuthenticated) {
    route = (
      <Route
        path={props.match.path + "/contact-data/:productId"}
        component={ContactData}
      />
    );
  }

  return (
    <React.Fragment>
      <Toolbar
        notMain="true"
        gotoHomeHandler={gotoHomeHandler}
        signIn={gotoSignInHandler}
        signUp={gotoSignUpHandler}
      />
      <main className={classes.Cart}>
        <h1
          style={{
            textAlign: "center",
            fontSize: 26,
            fontWeight: "600",
            marginBottom: 20,
          }}
        >
          {isAuthenticated ? "Carts" : "Login First"}
        </h1>
        {props.loading ? (
          <Spinner />
        ) : props.carts.length > 0 ? (
          props.carts.map((cart) => (
            <Carts
              id={cart.id}
              key={cart.idCart}
              title={cart.title}
              artist={cart.artist}
              price={cart.price}
              imageUrl={cart.imageUrl}
              remove={(event) => cartRemoveHandler(event, cart.idCart)}
              buy={(event) => cartBuyHandler(event, cart.id)}
              buyDetail="Buys"
            />
          ))
        ) : (
          <p className={classes.AddCart}>Add your carts</p>
        )}
      </main>
      {route}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    carts: state.cart.carts,
    loading: state.cart.loading,
    token: state.auth.token,
    peoples: state.people.peoples[0],
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCartInit: (token, id) => dispatch(actions.cartInit(token, id)),
    onCartRemove: (token, idPeople, id) =>
      dispatch(actions.cartRemoveDb(token, idPeople, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
