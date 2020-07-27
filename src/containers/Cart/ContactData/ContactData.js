import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import { updateObject, checkValidation } from "../../../shared/utility";
import * as actions from "../../../store/actions/index";

const ContactData = (props) => {
  const [form, setForm] = useState({
    address: {
      name: "Address",
      elementType: "textarea",
      elementConfig: {
        type: "textarea",
      },
      value: "",
      validation: {
        required: true,
        minLength: 50,
      },
      valid: false,
      touched: false,
      placeholder: "Enter your address",
      validText: "Please, enter your address",
    },
  });

  const {
    match: { params },
  } = props;

  const token = useSelector((state) => state.auth.token);
  const peoples = useSelector((state) => state.people.peoples[0]);
  const products = useSelector((state) => state.product.products[0]);
  const wishlists = useSelector((state) => state.wishlist.wishlists);
  const carts = useSelector((state) => state.cart.carts);
  const loading = useSelector((state) => state.order.loading);
  const error = useSelector((state) => state.order.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchProductDetail(params.productId));
    peoples && dispatch(actions.initWishlist(token, peoples.id));
  }, [dispatch, params, peoples, token]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      address: form.address.value,
      products: { ...products },
    };

    const wishlist = wishlists.filter(
      (wishlist) => wishlist.id === products.id
    )[0];
    const cart = carts.filter((cart) => cart.id === products.id)[0];

    dispatch(actions.addingOrder(token, peoples.id, data));
    dispatch(actions.cartRemoveDb(token, peoples.id, cart.idCart));
    dispatch(actions.wishlistRemoveDb(token, peoples.id, wishlist.idWishlist));
    dispatch(actions.productRemoveDb(token, products.id));
    props.history.push("/purchase");
  };

  const inputChangeHandler = (event, id) => {
    setForm(
      updateObject(form, {
        [id]: updateObject(form[id], {
          value: event.target.value,
          valid: checkValidation(event.target.value, form[id].validation),
          touched: true,
        }),
      })
    );
  };
  const formElements = [];
  for (const key in form) {
    formElements.push({
      id: key,
      config: {
        ...form[key],
      },
    });
  }

  return (
    <div className={classes.ContactData}>
      <h3>Contact Data</h3>
      <p>
        You buy {products && products.title} from {products && products.artist}
      </p>
      <form onSubmit={onSubmitHandler}>
        {loading ? (
          <Spinner />
        ) : (
          formElements.map((element) => (
            <Input
              key={element.id}
              label={element.config.name}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
              invalid={!element.config.valid}
              invalidText={element.config.validText}
              shouldValidate={element.config.validation}
              isTouched={element.config.touched}
              placeholder={element.config.placeholder}
              changed={(event) => inputChangeHandler(event, element.id)}
            />
          ))
        )}
        {error && <p className={classes.ErrorMessage}>{error.message}</p>}
        <Button
          btnType="Success"
          style={{ fontSize: 14, fontWeight: 600, lineHeight: "32px" }}
          disabled={false}
        >
          Purchase
        </Button>
      </form>
    </div>
  );
};

export default ContactData;
