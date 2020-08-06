import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Toolbar from "../../components/Toolbar/Toolbar";
import classes from "./Wishlist.module.css";
import Carts from "../../components/Carts/Carts";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

const Wishlist = (props) => {
  const wishlists = useSelector((state) => state.wishlist.wishlists);
  const loading = useSelector((state) => state.wishlist.loading);
  const peoples = useSelector((state) => state.people.peoples[0]);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    peoples && dispatch(actions.initWishlist(token, peoples.id));
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

  const onCartHandler = (event, id) => {
    const token = localStorage.getItem("token");
    const wishlist = wishlists.filter((wishlist) => wishlist.idWishlist === id);
    dispatch(actions.cartAdded(token, peoples.id, wishlist[0]));
    dispatch(actions.wishlistRemoveDb(token, peoples.id, id));
  };

  const onRemoveHandler = (event, id) => {
    const token = localStorage.getItem("token");
    dispatch(actions.wishlistRemoveDb(token, peoples.id, id));
  };

  return (
    <React.Fragment>
      <Toolbar
        notMain="true"
        gotoHomeHandler={gotoHomeHandler}
        signIn={signInHandler}
        signUp={signUpHandler}
      />
      <main className={classes.Wishlist}>
        <h1>Wishlist</h1>
        {loading ? (
          <Spinner />
        ) : wishlists.length > 0 ? (
          wishlists.map((wishlist) => (
            <Carts
              id={wishlist.id}
              key={wishlist.idWishlist}
              title={wishlist.title}
              artist={wishlist.artist}
              price={wishlist.price}
              imageUrl={wishlist.imageUrl}
              buyDetail="Add to cart"
              buy={(event) => onCartHandler(event, wishlist.idWishlist)}
              remove={(event) => onRemoveHandler(event, wishlist.idWishlist)}
            />
          ))
        ) : (
          <p>Add Your Wishlists</p>
        )}
      </main>
    </React.Fragment>
  );
};

export default Wishlist;
