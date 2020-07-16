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
        <img className={classes.Image} src={discountImage} alt="Discount" />
      </div>
      <div className={classes.Box}>
        <img className={classes.Image} src={paint1} alt="Discount" />
      </div>
      <div className={classes.Box}>
        <img className={classes.Image} src={paint2} alt="Discount" />
      </div>
      <div className={classes.Box}>
        <img className={classes.Image} src={paint3} alt="Discount" />
      </div>
    </div>
  );
};

export default Carousel;
