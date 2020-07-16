import React from "react";
import Logo from "../Logo/Logo";
import NavigationItems from "./NavigationItems/NavigationItems";
import classes from "./Navigation.module.css";
import HelpCenter from "../UI/HelpCenter/HelpCenter";
import Backdrop from "../UI/Backdrop/Backdrop";

const Navigation = (props) => {
  const classNames = [
    classes.Navigation,
    props.open ? classes.Open : classes.Close,
  ];

  return (
    <React.Fragment>
      {props.open && <Backdrop closed={props.closed} />}
      <nav className={classNames.join(" ")}>
        <Logo style={{ cursor: "pointer" }} clicked={props.gotoHandler} />
        <h2>Explore</h2>
        <NavigationItems categories={props.categories} />
        <HelpCenter />
      </nav>
    </React.Fragment>
  );
};

export default Navigation;
