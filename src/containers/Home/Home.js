import React from "react";
import Layout from "../../hoc/Layout/Layout";
import Header from "../../components/Header/Header";
import Carousel from "../../components/Carousel/Carousel";
import classes from "./Home.module.css";
import Products from "../../components/Products/Products";

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

  return (
    <Layout
      signIn={signInHandler}
      signUp={signUpHandler}
      gotoHandler={gotoHandler}
    >
      <Header
        title="New In"
        icon="https://img.icons8.com/fluent/48/000000/lightning-bolt.png"
      />
      <main className={classes.Home}>
        <Carousel />
        <Products />
      </main>
    </Layout>
  );
};

export default Home;
