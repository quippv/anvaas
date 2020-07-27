import React, { useState } from "react";
import Layout from "../../../hoc/Layout/Layout";
import Header from "../../../components/Header/Header";
import Products from "../../../components/Products/Products";

const Realist = (props) => {
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
        title="Realist"
        icon="https://img.icons8.com/color/48/000000/opacity.png"
        sortPrice={sortPriceHandler}
        price={price}
      />
      <main>
        <Products category="realist" sortPrice={price} />
      </main>
    </Layout>
  );
};

export default Realist;
