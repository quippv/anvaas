import React, { useState } from "react";

import Input from "../../../components/UI/Input/Input";
import classes from "../Auth.module.css";
import signUpImage from "../../../assets/images/signup.png";
import Logo from "../../../components/Logo/Logo";
import Button from "../../../components/UI/Button/Button";
import { updateObject, checkValidation } from "../../../shared/utility";

const SignUp = (props) => {
  const [form, setForm] = useState({
    username: {
      elementType: "input",
      elementConfig: {
        type: "text",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
      placeholder: "Username at least 6 characters",
      validText: "Username is less than 6 characters",
    },
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
      elementType: "input",
      elementConfig: {
        type: "password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
      placeholder: "Password at least 6 characters",
      validText: "Password is less than 6 characters",
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setForm(
      updateObject(form, {
        username: updateObject(form.username, {
          value: "",
          valid: false,
          touched: false,
        }),
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
        username: updateObject(form.username, {
          value: "",
          valid: false,
          touched: false,
        }),
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
    props.history.push("/auth");
  };

  const gotoHomeHandler = () => {
    props.history.push("/");
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
            {formElements.map((element) => (
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
              />
            ))}
            <Button
              btnType="Success"
              style={{ fontSize: 14, fontWeight: 600, lineHeight: "32px" }}
              disabled={
                form.username.valid && form.email.valid && form.password.valid
                  ? false
                  : true
              }
            >
              Register
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

export default SignUp;
