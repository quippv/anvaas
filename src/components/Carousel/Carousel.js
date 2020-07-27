import React from "react";
import classes from "./Carousel.module.css";
import discountImage from "../../assets/images/discount.png";
import paint1 from "../../assets/images/paint1.jpg";
import paint2 from "../../assets/images/paint2.png";
import paint3 from "../../assets/images/paint3.png";

const Carousel = (props) => {
  return (
    <div className={classes.Carousel}>
      <div className={classes.Box}>
        <div
          className={classes.Image}
          style={{ backgroundImage: `url(${discountImage})` }}
        />
      </div>
      <div className={classes.Box}>
        <div
          className={classes.Image}
          style={{ backgroundImage: `url(${paint1})` }}
        />
      </div>
      <div className={classes.Box}>
        <div
          className={classes.Image}
          style={{ backgroundImage: `url(${paint2})` }}
        />
      </div>
      <div className={classes.Box}>
        <div
          className={classes.Image}
          style={{ backgroundImage: `url(${paint3})` }}
        />
      </div>
    </div>
  );
};

export default Carousel;
