import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import classes from "./Toolbar.module.css";
import Search from "../UI/Search/Search";
import Cart from "../UI/Cart/Cart";
import Profile from "../Profile/Profile";
import NavigationToggle from "../Navigation/NavigationToggle/NavigationToggle";
import Logo from "../Logo/Logo";
import * as actions from "../../store/actions/index";

const Toolbar = (props) => {
  const [showSearch, setShowSearch] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const isscroll = window.scrollY > 30;
      if (isscroll !== isScroll) {
        setIsScroll(isscroll);
      }
    });
    return () =>
      document.removeEventListener("scroll", () => {
        const isscroll = window.scrollY > 30;
        if (isscroll !== isScroll) {
          setIsScroll(isscroll);
        }
      });
  }, [isScroll]);

  const { token, peoples } = props;

  useEffect(() => {
    peoples && dispatch(actions.cartInit(token, peoples.id));
  }, [dispatch, token, peoples]);

  const showSearchHandler = () => {
    setShowSearch(!showSearch);
  };

  return (
    <header
      className={classes.Toolbar}
      style={{
        boxShadow: isScroll && "0 2px 2px -2px gray",
        width: props.notMain && "100%",
        paddingLeft: props.notMain && "10px",
      }}
    >
      <div className={classes.Navigation}>
        {!props.notMain && <NavigationToggle clicked={props.openSideBar} />}
        {props.notMain && (
          <Logo style={{ cursor: "pointer" }} clicked={props.gotoHomeHandler} />
        )}
        <Search show={showSearchHandler} open={showSearch} />
      </div>
      <div className={classes.Profile}>
        <NavLink to="/cart" activeClassName={classes.active}>
          <Cart
            quantity={props.quantity}
            style={{ transform: props.loading ? "scale(1.2)" : "scale(1)" }}
          />
        </NavLink>
        <Profile signIn={props.signIn} signUp={props.signUp} />
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    quantity: state.cart.carts.length,
    loading: state.cart.loading,
    token: state.auth.token,
    peoples: state.people.peoples[0],
  };
};

export default connect(mapStateToProps)(Toolbar);
