import React from "react";
import Layout from "../../hoc/Layout/Layout";
import Header from "../../components/Header/Header";
import classes from "./Abstract.module.css";
import Products from "../../components/Products/Products";

const Abstract = (props) => {
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
        title="Abstract"
        icon="https://img.icons8.com/color/48/000000/opacity.png"
      />
      <main className={classes.Abstract}>
        <Products />
      </main>
    </Layout>
  );
};

export default Abstract;
