import React, { useState } from "react";
import Layout from "../../../hoc/Layout/Layout";
import Header from "../../../components/Header/Header";
import Products from "../../../components/Products/Products";

const Surrealist = (props) => {
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
        title="Surrealist"
        icon="https://img.icons8.com/color/48/000000/opacity.png"
        sortPrice={sortPriceHandler}
        price={price}
      />
      <main>
        <Products category="surrealist" sortPrice={price} />
      </main>
    </Layout>
  );
};

export default Surrealist;
