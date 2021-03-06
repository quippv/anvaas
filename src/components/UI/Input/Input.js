import React from "react";
import classes from "./Input.module.css";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const Input = (props) => {
  let inputElement = null;

  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.isTouched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "file":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "password":
      inputElement = (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <input
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            style={{ paddingRight: 30 }}
          />
          <div onClick={props.visibilityClicked}>
            {props.visibility ? (
              <Visibility
                style={{
                  fontSize: 20,
                  color: "rgba(0, 0, 0, 0.6)",
                  position: "absolute",
                  zIndex: 2,
                  right: 10,
                  bottom: 12,
                  cursor: "pointer",
                }}
              />
            ) : (
              <VisibilityOff
                style={{
                  fontSize: 20,
                  color: "rgba(0, 0, 0, 0.48)",
                  position: "absolute",
                  zIndex: 2,
                  right: 10,
                  bottom: 12,
                  cursor: "pointer",
                }}
              />
            )}
          </div>
        </div>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <label className={classes.Input}>
      <p className={classes.Label}>{props.label}</p>
      {inputElement}
      {props.placeholder && (
        <p
          className={classes.Placeholder}
          style={{
            color:
              props.invalid &&
              props.shouldValidate &&
              props.isTouched &&
              "#d13127",
          }}
        >
          {props.invalid && props.shouldValidate && props.isTouched
            ? props.invalidText
            : props.placeholder}
        </p>
      )}
    </label>
  );
};

export default Input;
