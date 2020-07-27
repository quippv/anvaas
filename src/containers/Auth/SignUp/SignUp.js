import React, { useState } from "react";
import { connect } from "react-redux";

import Input from "../../../components/UI/Input/Input";
import classes from "../Auth.module.css";
import signUpImage from "../../../assets/images/signup.png";
import Logo from "../../../components/Logo/Logo";
import Button from "../../../components/UI/Button/Button";
import { updateObject, checkValidation } from "../../../shared/utility";
import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";

const SignUp = (props) => {
  const [form, setForm] = useState({
    email: {
      name: "Email",
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
      name: "Password",
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
    confirmPassword: {
      name: "Confirm Password",
      elementType: "password",
      elementConfig: {
        type: "password",
        autoComplete: "on",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      placeholder: "Re-type yout password",
      validText: "Your password must be the same",
      visibility: false,
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onAuth(form.email.value, form.password.value, true);
    props.onSetAuthRedirectPath("/personal-data");
  };

  const inputChangeHandler = (event, id) => {
    setForm(
      updateObject(form, {
        [id]: updateObject(form[id], {
          value: event.target.value,
          valid:
            id === "confirmPassword"
              ? form.password.value === event.target.value
              : checkValidation(event.target.value, form[id].validation),
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
        confirmPassword: updateObject(form.confirmPassword, {
          value: "",
          valid: false,
          touched: false,
        }),
      })
    );
    props.history.push("/auth");
  };

  const gotoHomeHandler = () => {
    props.history.push("/");
  };

  const visibilityPasswordHandler = (event, id) => {
    setForm(
      updateObject(form, {
        [id]: updateObject(form[id], {
          visibility: !form[id].visibility,
          elementConfig: updateObject(form[id].elementConfig, {
            type: !form[id].visibility ? "text" : "password",
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
          <h1>Sign Up</h1>
          <p className={classes.FormText}>
            Already have Anvaas account?{" "}
            <span onClick={switchHandler}>Sign In</span>
          </p>
          <form onSubmit={onSubmitHandler}>
            {props.loading ? (
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
                  visibility={element.config.visibility}
                  visibilityClicked={(event) =>
                    visibilityPasswordHandler(event, element.id)
                  }
                />
              ))
            )}
            {props.error && (
              <p className={classes.ErrorMessage}>{props.error.message}</p>
            )}
            <Button
              btnType="Success"
              style={{ fontSize: 14, fontWeight: 600, lineHeight: "32px" }}
              disabled={
                form.email.valid &&
                form.password.valid &&
                form.confirmPassword.valid
                  ? false
                  : true
              }
            >
              Continue
            </Button>
          </form>
          <div className={classes.Agreement}>
            <p>By registering, I agree</p>
            <p>
              <span>Terms and Conditions</span> and <span>Privacy Policy</span>.
            </p>
          </div>
        </div>
        <div className={classes.Image}>
          <img src={signUpImage} alt="signinup" />
        </div>
      </main>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
