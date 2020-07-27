import React, { useState } from "react";
import { connect } from "react-redux";

import Input from "../../../../components/UI/Input/Input";
import classes from "../../Auth.module.css";
import personalDataImage from "../../../../assets/images/personal-data.png";
import Logo from "../../../../components/Logo/Logo";
import Button from "../../../../components/UI/Button/Button";
import { updateObject, checkValidation } from "../../../../shared/utility";
import * as actions from "../../../../store/actions/index";
import Spinner from "../../../../components/UI/Spinner/Spinner";

const Register = (props) => {
  const [form, setForm] = useState({
    fullName: {
      name: "Full Name",
      elementType: "input",
      elementConfig: {
        type: "text",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      placeholder: "Enter your name",
      validText: "Please, enter your name",
    },
    birthday: {
      name: "BirthDay",
      elementType: "input",
      elementConfig: {
        type: "date",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      placeholder: "Enter your birthday",
      validText: "Please, enter your birthday",
    },
    gender: {
      name: "Gender",
      elementType: "input",
      elementConfig: {
        type: "text",
      },
      value: "",
      validation: {
        required: true,
        maxLength: 1,
        minLength: 1,
        isGender: true,
      },
      valid: false,
      touched: false,
      placeholder: "M/F",
      validText: "Please, enter M/F",
    },
    phoneNumber: {
      name: "Phone Number",
      elementType: "input",
      elementConfig: {
        type: "tel",
      },
      value: "",
      validation: {
        required: true,
        isPhoneNumber: true,
      },
      valid: false,
      touched: false,
      placeholder: "Example: (+628/08)1234567890",
      validText: "Please, enter like a format",
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      fullName: form.fullName.value.toLowerCase(),
      birthDay: form.birthday.value,
      gender: form.gender.value,
      phoneNumber: form.phoneNumber.value,
      userId: props.userId,
      artist: false,
    };
    props.onAddPeople(props.token, data);
    props.history.push("/");
    props.onSetAuthRedirectPath("/");
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
      <Logo style={{ display: "block", margin: "20px auto" }} />
      <main className={classes.Auth}>
        <div className={classes.Form}>
          <h1>Personal Data</h1>
          <p className={classes.FormText}>Please input your data</p>
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
                form.fullName.valid &&
                form.gender.valid &&
                form.birthday.valid &&
                form.phoneNumber.valid
                  ? false
                  : true
              }
            >
              Register
            </Button>
          </form>
        </div>
        <div className={classes.Image}>
          <img src={personalDataImage} alt="signinup" />
        </div>
      </main>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    error: state.people.error,
    loading: state.people.loading,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPeople: (token, data) => dispatch(actions.addPeople(token, data)),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
