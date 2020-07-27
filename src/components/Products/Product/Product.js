import React from "react";
import { Link } from "react-router-dom";
import { Add, FavoriteBorder, Favorite } from "@material-ui/icons";
import classes from "./Product.module.css";

const Product = (props) => {
  return (
    <div className={classes.Product}>
      <div className={classes.Header}>
        <p>{props.artist}</p>
        <h3>{props.title}</h3>
      </div>
      <Link to={`/detail-product/${props.id}`} className={classes.Image}>
        <img src={props.imageUrl} alt={props.title} />
      </Link>
      <div className={classes.Footer}>
        <div className={classes.Price}>
          <p>from</p>
          <h6>${props.price}</h6>
        </div>
        <div style={{ display: "flex", textAlign: "center" }}>
          <button
            className={classes.FavoriteBorder}
            onClick={props.fav}
            disabled={props.disabledFav}
          >
            {props.disabledFav ? (
              <Favorite
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: "#b022b9",
                }}
              />
            ) : (
              <FavoriteBorder
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: "#b022b9",
                }}
              />
            )}
          </button>
          <button
            className={classes.Add}
            onClick={props.buy}
            disabled={props.disabledAdd}
          >
            <Add style={{ textAlign: "center", fontSize: 16, color: "#fff" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
