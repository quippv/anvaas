import React, { useEffect } from "react";
import { ChevronLeft } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Detail.module.css";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";

const Detail = (props) => {
  const {
    match: { params },
  } = props;
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products[0]);
  const peoples = useSelector((state) => state.people.peoples[0]);
  const token = useSelector((state) => state.auth.token);
  const wishlists = useSelector((state) => state.wishlist.wishlists);
  const carts = useSelector((state) => state.cart.carts);

  useEffect(() => {
    dispatch(actions.fetchProductDetail(params.productId));
    peoples && dispatch(actions.initWishlist(token, peoples.id));
    peoples && dispatch(actions.cartInit(token, peoples.id));
  }, [dispatch, params, token, peoples]);

  const onAddToWhislistHandler = () => {
    if (token === null) {
      props.history.push("/register");
    } else {
      dispatch(actions.addingWishlist(token, peoples.id, products));
    }
  };

  const goBackHandler = () => {
    props.history.goBack();
  };

  return (
    <React.Fragment>
      <main className={classes.Detail}>
        <div className={classes.Image}>
          <img
            src={products && products.imageUrl}
            alt={products ? products.title : "Title"}
          />
        </div>
        <div className={classes.Details}>
          <div className={classes.Back} onClick={goBackHandler}>
            <ChevronLeft style={{ fontSize: 14 }} />
            <p>Go to back</p>
          </div>
          <p>{products ? products.category.toUpperCase() : "Category"}</p>
          <h1>{products ? products.title : "Title"}</h1>
          <h5>{products ? products.artist : "Artist"}</h5>
          <p>{products ? products.description : "Description"}</p>
          <p className={classes.Price}>
            ${products ? products.price : "Price"}
          </p>
          <div className={classes.Button}>
            <Button
              btnType="SignIn"
              style={{ marginRight: 20 }}
              clicked={onAddToWhislistHandler}
              disabled={
                wishlists
                  ? wishlists.filter(
                      (wishlist) => wishlist.id === params.productId
                    ).length > 0
                    ? true
                    : false
                  : false
              }
            >
              {wishlists
                ? wishlists.filter(
                    (wishlist) => wishlist.id === params.productId
                  ).length > 0
                  ? "Wishlisted"
                  : "Add To Wishlist"
                : "Add To Wishlist"}
            </Button>
            <Button
              btnType="SignUp"
              disabled={
                carts
                  ? carts.filter((cart) => cart.id === params.productId)
                      .length > 0
                    ? true
                    : false
                  : false
              }
            >
              {carts
                ? carts.filter((cart) => cart.id === params.productId).length >
                  0
                  ? "Carted"
                  : "Add to Cart"
                : "Add to Cart"}
            </Button>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Detail;
