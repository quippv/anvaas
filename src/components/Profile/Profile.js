import React, { useState } from "react";
import { AccountCircleOutlined, ExpandMore } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

import classes from "./Profile.module.css";
import DropDown from "../UI/DropDown/DropDown";
import Button from "../UI/Button/Button";

const Profile = (props) => {
  const [dropDown, setDropDown] = useState(false);

  const dropDownHandler = () => {
    setDropDown(!dropDown);
  };

  return (
    <div className={classes.Profile}>
      <AccountCircleOutlined style={{ fontSize: 26, marginRight: 2 }} />
      <p className={classes.Name}>
        <span>Hello</span> Mr. Anyone
      </p>
      <div onClick={dropDownHandler}>
        <ExpandMore
          style={{ fontSize: 16, marginLeft: 2, cursor: "pointer" }}
        />
      </div>
      {dropDown && (
        <DropDown>
          <p className={classes.DropName}>
            <span>Hello</span> Mr. Anyone
          </p>
          <div className={classes.Auth}>
            <Button btnType="SignIn" clicked={props.signIn}>
              Sign In
            </Button>
            <div></div>
            <Button btnType="SignUp" clicked={props.signUp}>
              Register
            </Button>
          </div>
          <p style={{ fontSize: 12, marginTop: 5, textAlign: "center" }}>
            Are you an artist? <NavLink to="/sell">sell art!</NavLink>{" "}
          </p>
        </DropDown>
      )}
    </div>
  );
};

export default Profile;
