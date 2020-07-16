import React from "react";
import { Search } from "@material-ui/icons";
import classes from "./Search.module.css";

const SearchComponent = (props) => {
  return (
    <label className={classes.Search}>
      <div onClick={props.show}>
        <Search style={{ fontSize: 14, cursor: "pointer" }} />
      </div>
      <input
        placeholder="Search for..."
        className={props.open ? classes.Open : classes.Close}
      />
    </label>
  );
};

export default SearchComponent;
