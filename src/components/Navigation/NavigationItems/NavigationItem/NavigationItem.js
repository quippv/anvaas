import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const NavigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        className={classes.NavLink}
        activeClassName={classes.Active}
        exact={props.exact}
      >
        <img src={props.icon} alt={props.name} />
        {props.name}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
