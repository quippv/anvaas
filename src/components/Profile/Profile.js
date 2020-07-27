import React, { useState, useEffect } from "react";
import { AccountCircleOutlined, ExpandMore } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Profile.module.css";
import DropDown from "../UI/DropDown/DropDown";
import Button from "../UI/Button/Button";
import DropDownProfile from "./DropDownProfile/DropDownProfile";
import * as actions from "../../store/actions/index";

const Profile = (props) => {
  const [dropDown, setDropDown] = useState(false);

  const dropDownHandler = () => {
    setDropDown(!dropDown);
  };

  const { onFetchPeopleInit, token, userId } = props;

  useEffect(() => {
    if (token && userId) {
      onFetchPeopleInit(token, userId);
    }
  }, [onFetchPeopleInit, token, userId]);

  let button = (
    <div className={classes.Auth}>
      <Button btnType="SignIn" clicked={props.signIn}>
        Sign In
      </Button>
      <div></div>
      <Button btnType="SignUp" clicked={props.signUp}>
        Register
      </Button>
    </div>
  );
  if (props.isAuthenticated) {
    button = <DropDownProfile />;
  }

  const fullName = props.peoples && (
    <React.Fragment>
      <span>Hello</span>{" "}
      {props.peoples.gender === "M" || props.peoples.gender === "m"
        ? "Mr"
        : "Ms"}
      . {!props.peoples.fullName ? "Anyone" : props.peoples.fullName}
    </React.Fragment>
  );

  let sellArt = (
    <p
      style={{
        fontSize: 12,
        marginTop: 5,
        textAlign: "center",
        padding: "10px 15px",
      }}
    >
      Are you an artist?{" "}
      <NavLink to={!props.isAuthenticated ? "/register" : "/sell"}>
        sell art!
      </NavLink>{" "}
    </p>
  );
  if (props.peoples) {
    if (props.peoples.artist) {
      sellArt = null;
    }
  }

  return (
    <div className={classes.Profile}>
      <div>
        {props.peoples ? (
          <div
            style={{
              backgroundImage: `url(${props.peoples.imageUrl})`,
              width: 26,
              height: 26,
              marginRight: 2,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%",
              backgroundRepeat: "no-repeat",
            }}
          />
        ) : (
          <AccountCircleOutlined style={{ fontSize: 26, marginRight: 2 }} />
        )}
      </div>
      <p className={classes.Name}>{fullName}</p>
      <div onClick={dropDownHandler}>
        <ExpandMore
          style={{ fontSize: 16, marginLeft: 2, cursor: "pointer" }}
        />
      </div>
      {dropDown && (
        <DropDown>
          <p className={classes.DropName}>{fullName}</p>
          {button}
          {sellArt}
        </DropDown>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    userId: state.auth.userId,
    peoples: state.people.peoples[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPeopleInit: (token, userId) =>
      dispatch(actions.fetchPeopleInit(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
