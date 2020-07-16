import React from "react";
import { BubbleChart } from "@material-ui/icons";
import classes from "./HelpCenter.module.css";

const HelpCenter = () => {
  return (
    <div className={classes.HelpCenter}>
      <BubbleChart />
      <p>Help Center</p>
    </div>
  );
};

export default HelpCenter;
