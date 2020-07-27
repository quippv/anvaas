import React from "react";
import classes from "./Spinner.module.css";
import classesBar from "./SpinBar.module.css";

const Spinner = (props) => {
  return (
    <div className={props.spinBar ? classesBar.SpinBar : classes.Loader}>
      Loading...
    </div>
  );
};

export default Spinner;
