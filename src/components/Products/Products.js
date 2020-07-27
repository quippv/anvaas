import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Product from "./Product/Product";
import classes from "./Products.module.css";
import * as actions from "../../store/actions/index";
import Spinner from "../UI/Spinner/Spinner";

const Products = (props) => {
  const { onFetchProduct, token, peoples, onInitWishlist } = props;

  useEffect(() => {
    onFetchProduct();
  }, [onFetchProduct]);

  useEffect(() => {
    peoples && token && onInitWishlist(token, peoples.id);
  }, [onInitWishlist, token, peoples]);

  const onBuyHandler = (event, id) => {
    if (props.isAuthenticated) {
      const product = props.products.filter((product) => product.id === id);
      props.onCartAdded(props.token, props.peoples.id, product[0]);
    } else {
      props.onSetAuthRedirect("/register");
    }
  };

  const onFavHandler = (event, id) => {
    if (props.isAuthenticated) {
      const product = props.products.filter((product) => product.id === id);
      props.onWishlistAdded(token, peoples.id, product[0]);
    } else {
      props.onSetAuthRedirect("/register");
    }
  };

  let redirect = null;
  if (props.authRedirectPath === "/register") {
    redirect = <Redirect to={props.authRedirectPath} />;
    props.onSetAuthRedirect("/");
  }

  let idFav = null;
  if (props.products && props.wishlists) {
    idFav = props.products.filter(
      (product) =>
        !props.wishlists.some((wishlist) => wishlist.id === product.id)
    );
  }

  return (
    <div className={classes.Products}>
      {props.loading ? (
        <div style={{ gridColumn: "4 span" }}>
          <Spinner />
        </div>
      ) : (
        props.products
          .filter((product) =>
            props.category ? product.category === props.category : product
          )
          .filter(
            (product) => !props.carts.some((cart) => cart.id === product.id)
          )
          .sort((a, b) =>
            props.sortPrice === "High" ? a.price - b.price : b.price - a.price
          )
          .map((product) => (
            <Product
              id={product.id}
              key={product.id}
              title={product.title}
              artist={product.artist}
              price={product.price}
              imageUrl={product.imageUrl}
              disabledAdd={product.quantity === 0 && true}
              disabledFav={
                !idFav.some((id) => {
                  if (id.id === product.id) {
                    return true;
                  } else {
                    return false;
                  }
                })
              }
              buy={(event) => onBuyHandler(event, product.id)}
              fav={(event) => onFavHandler(event, product.id)}
            />
          ))
      )}
      {redirect}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    wishlists: state.wishlist.wishlists,
    loading: state.product.loading,
    token: state.auth.token,
    peoples: state.people.peoples[0],
    carts: state.cart.carts,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProduct: () => dispatch(actions.fetchProductInit()),
    onCartAdded: (token, id, data) =>
      dispatch(actions.cartAdded(token, id, data)),
    onWishlistAdded: (token, id, data) =>
      dispatch(actions.addingWishlist(token, id, data)),
    onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirectPath(path)),
    onInitWishlist: (token, id) => dispatch(actions.initWishlist(token, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
