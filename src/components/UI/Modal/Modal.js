import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <React.Fragment>
      <Backdrop show={props.showed} closed={props.canceled} />
      <div
        className={classes.Modal}
        style={{
          transform: props.showed ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.showed ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    prevProps.showed === nextProps.showed &&
    prevProps.children === nextProps.children
);
