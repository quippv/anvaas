import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { Search } from "@material-ui/icons";
import classes from "./Search.module.css";

const SearchComponent = (props) => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);

  const products = useSelector((state) => state.product.products);

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  const inputChangeHandler = (event) => {
    const value = event.target.value;
    let suggestions = [];
    if (value.length > 0) {
      suggestions = products
        .sort()
        .filter((product) =>
          product.title.toLowerCase().includes(value.toLowerCase())
        );
    }
    setValue(value);
    setResult(suggestions);
  };

  return (
    <div className={classes.Result}>
      <label className={classes.Search}>
        <form onSubmit={onSubmitHandler}>
          <div onClick={props.show}>
            <Search style={{ fontSize: 14, cursor: "pointer" }} />
          </div>
          <input
            placeholder="Search for..."
            className={props.open ? classes.Open : classes.Close}
            value={value}
            onChange={inputChangeHandler}
          />
        </form>
      </label>
      {result.length > 0 ? (
        <ul
          className={[
            classes.SearchResult,
            props.open ? classes.OpenResult : classes.CloseResult,
          ].join(" ")}
        >
          {result.map((product) => (
            <li
              key={product.id}
              className={props.open ? classes.OpenResult : classes.CloseResult}
            >
              <NavLink
                to={`/detail-product/${product.id}`}
                className={classes.Link}
              >
                {product.title}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default SearchComponent;
