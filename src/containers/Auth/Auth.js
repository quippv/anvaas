import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import signInImage from "../../assets/images/signin.png";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/UI/Button/Button";
import { updateObject, checkValidation } from "../../shared/utility";
import * as actions from "../../store/actions/index";

import Spinner from "../../components/UI/Spinner/Spinner";

const Auth = (props) => {
  const [form, setForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
      placeholder: "Example: email@anvaas.com",
      validText: "Incorrect email format",
    },
    password: {
      elementType: "password",
      elementConfig: {
        type: "password",
        autoComplete: "on",
      },
      value: "",
      validation: {
        required: true,
        isPassword: true,
      },
      valid: false,
      touched: false,
      placeholder:
        "Contain at least 8 characters, 1 number, 1 lowercase & uppercase character (A-Z)",
      validText:
        "Contain at least 8 characters, 1 number, 1 lowercase & uppercase character (A-Z)",
      visibility: false,
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onAuth(form.email.value, form.password.value, false);
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

  // Switch router function
  const switchHandler = () => {
    setForm(
      updateObject(form, {
        email: updateObject(form.email, {
          value: "",
          valid: false,
          touched: false,
        }),
        password: updateObject(form.password, {
          value: "",
          valid: false,
          touched: false,
        }),
      })
    );
    props.history.push("/register");
  };

  const gotoHomeHandler = () => {
    props.history.push("/");
  };

  const visibilityPasswordHandler = () => {
    setForm(
      updateObject(form, {
        password: updateObject(form.password, {
          visibility: !form.password.visibility,
          elementConfig: updateObject(form.password.elementConfig, {
            type: !form.password.visibility ? "text" : "password",
          }),
        }),
      })
    );
  };

  // Array for form
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
    <React.Fragment>
      <Logo
        style={{ display: "block", margin: "20px auto", cursor: "pointer" }}
        clicked={gotoHomeHandler}
      />
      <main className={classes.Auth}>
        <div className={classes.Form}>
          <h1>Sign In</h1>
          <p className={classes.FormText}>
            Don't have Anvaas account?{" "}
            <span onClick={switchHandler}>Register</span>
          </p>
          <form onSubmit={onSubmitHandler}>
            {props.loading ? (
              <Spinner />
            ) : (
              formElements.map((element) => (
                <Input
                  key={element.id}
                  label={element.id}
                  elementType={element.config.elementType}
                  elementConfig={element.config.elementConfig}
                  value={element.config.value}
                  invalid={!element.config.valid}
                  invalidText={element.config.validText}
                  shouldValidate={element.config.validation}
                  isTouched={element.config.touched}
                  placeholder={element.config.placeholder}
                  changed={(event) => inputChangeHandler(event, element.id)}
                  visibility={element.config.visibility}
                  visibilityClicked={visibilityPasswordHandler}
                />
              ))
            )}
            {props.error && (
              <p className={classes.ErrorMessage}>{props.error.message}</p>
            )}
            <Button
              btnType="Danger"
              style={{ fontSize: 14, fontWeight: 600, lineHeight: "32px" }}
              disabled={form.email.valid && form.password.valid ? false : true}
            >
              Sign in
            </Button>
            {props.isAuthenticated && <Redirect to="/" />}
          </form>
        </div>
        <div className={classes.Image}>
          <img src={signInImage} alt="signinup" />
        </div>
      </main>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
