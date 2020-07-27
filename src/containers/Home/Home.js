import React, { useState } from "react";
import Layout from "../../hoc/Layout/Layout";
import Header from "../../components/Header/Header";
import Carousel from "../../components/Carousel/Carousel";
import classes from "./Home.module.css";
import Products from "../../components/Products/Products";
import axios from "../../axios-db";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const Home = (props) => {
  const signInHandler = () => {
    props.history.push("/auth");
  };

  const signUpHandler = () => {
    props.history.push("/register");
  };

  const gotoHandler = () => {
    props.history.push("/");
  };

  const [price, setPrice] = useState("Low");

  const sortPriceHandler = () => {
    price === "Low" ? setPrice("High") : setPrice("Low");
  };

  return (
    <Layout
      signIn={signInHandler}
      signUp={signUpHandler}
      gotoHandler={gotoHandler}
    >
      <Header
        title="New In"
        icon="https://img.icons8.com/fluent/48/000000/lightning-bolt.png"
        sortPrice={sortPriceHandler}
        price={price}
      />
      <main className={classes.Home}>
        <Carousel />
        <Products sortPrice={price} />
      </main>
    </Layout>
  );
};

export default withErrorHandler(Home, axios);
