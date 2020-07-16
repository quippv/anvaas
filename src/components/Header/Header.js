import React, { useState, useEffect } from "react";
import { Sort } from "@material-ui/icons";
import Card from "../UI/Card/Card";
import classes from "./Header.module.css";
import classesScroll from "./HeaderScroll.module.css";

const Header = (props) => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scroll = window.scrollY > 30;
      if (scroll !== isScroll) {
        setIsScroll(scroll);
      }
    });
  }, [isScroll]);

  return (
    <div className={!isScroll ? classes.Header : classesScroll.HeaderScroll}>
      {!isScroll ? (
        <div className={classes.Title}>
          <img src={props.icon} alt={props.title} />
          <h2>{props.title}</h2>
        </div>
      ) : (
        <img src={props.icon} alt={props.title} />
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Card marginLeft="10px" backgroundColor="#fff">
          <div className={classes.Sort}>
            <Sort style={{ fontSize: 18, transform: "scale(-1, 1)" }} />
            <p>Sort</p>
          </div>
        </Card>
        <Card marginLeft="10px" backgroundColor="#fff">
          <div className={classes.Filter}>
            <div className={classes.Count}>
              <p>0</p>
            </div>
            <p>Filter</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Header;
