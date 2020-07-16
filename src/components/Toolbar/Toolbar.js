import React, { useState, useEffect } from "react";
import classes from "./Toolbar.module.css";
import Search from "../UI/Search/Search";
import Cart from "../UI/Cart/Cart";
import Profile from "../Profile/Profile";
import NavigationToggle from "../Navigation/NavigationToggle/NavigationToggle";

const Toolbar = (props) => {
  const [showSearch, setShowSearch] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const isscroll = window.scrollY > 30;
      if (isscroll !== isScroll) {
        setIsScroll(isscroll);
      }
    });
  }, [isScroll]);

  const showSearchHandler = () => {
    setShowSearch(!showSearch);
  };

  return (
    <header
      className={classes.Toolbar}
      style={{ boxShadow: isScroll && "0 2px 2px -2px gray" }}
    >
      <div className={classes.Navigation}>
        <NavigationToggle clicked={props.openSideBar} />
        <Search show={showSearchHandler} open={showSearch} />
      </div>
      <div className={classes.Profile}>
        <Cart />
        <Profile signIn={props.signIn} signUp={props.signUp} />
      </div>
    </header>
  );
};

export default Toolbar;
