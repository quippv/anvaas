import React, { Suspense, useEffect } from "react";
import { Switch, Redirect, withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import LoadingBar from "./components/UI/LoadingBar/LoadingBar";
import * as actions from "./store/actions/index";
import Agreement from "./components/Agreement/Agreement";

const Home = React.lazy(() => {
  return import("./containers/Home/Home");
});

const Abstract = React.lazy(() => {
  return import("./containers/SubMenu/Abstract/Abstract");
});
const Contemporary = React.lazy(() => {
  return import("./containers/SubMenu/Contemporary/Contemporary");
});
const Cubism = React.lazy(() => {
  return import("./containers/SubMenu/Cubism/Cubism");
});
const Expressionist = React.lazy(() => {
  return import("./containers/SubMenu/Expressionist/Expressionist");
});
const Realist = React.lazy(() => {
  return import("./containers/SubMenu/Realist/Realist");
});
const Surrealist = React.lazy(() => {
  return import("./containers/SubMenu/Surrealist/Surrealist");
});

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const SignUp = React.lazy(() => {
  return import("./containers/Auth/SignUp/SignUp");
});

const Logout = React.lazy(() => {
  return import("./containers/Auth/Logout/Logout");
});

const Setting = React.lazy(() => {
  return import("./containers/Setting/Setting");
});

const Wishlist = React.lazy(() => {
  return import("./containers/Wishlist/Wishlist");
});

const PersonalData = React.lazy(() => {
  return import("./containers/Auth/SignUp/Register/Register");
});

const Cart = React.lazy(() => {
  return import("./containers/Cart/Cart");
});

const SellArt = React.lazy(() => {
  return import("./containers/SellArt/SellArt");
});

const Detail = React.lazy(() => {
  return import("./containers/Detail/Detail");
});

const Purchase = React.lazy(() => {
  return import("./containers/Purchase/Purchase");
});

const App = (props) => {
  const {
    onAutoAuth,
    location: { pathname },
    isAuthenticated,
  } = props;

  useEffect(() => {
    onAutoAuth();
    isAuthenticated && localStorage.setItem("pathname", pathname);
  }, [onAutoAuth, pathname, isAuthenticated]);

  const personalData = props.peoples !== [] && (
    <Route
      path="/personal-data"
      render={(props) => <PersonalData {...props} />}
    />
  );

  let routes = (
    <Switch>
      <Route path="/setting" render={(props) => <Setting {...props} />} />
      <Route path="/wishlist" render={(props) => <Wishlist {...props} />} />
      <Route path="/purchase" render={(props) => <Purchase {...props} />} />
      <Route
        path="/detail-product/:productId"
        render={(props) => <Detail {...props} />}
      />
      <Route path="/cart" render={(props) => <Cart {...props} />} />
      <Route path="/sell" render={(props) => <SellArt {...props} />} />
      {personalData}
      <Route path="/abstract" render={(props) => <Abstract {...props} />} />
      <Route
        path="/contemporary"
        render={(props) => <Contemporary {...props} />}
      />
      <Route path="/cubism" render={(props) => <Cubism {...props} />} />
      <Route
        path="/expressionist"
        render={(props) => <Expressionist {...props} />}
      />
      <Route path="/realist" render={(props) => <Realist {...props} />} />
      <Route path="/surrealist" render={(props) => <Surrealist {...props} />} />
      <Route path="/agreement" component={Agreement} />
      <Route path="/logout" render={(props) => <Logout {...props} />} />
      <Route path="/" exact render={(props) => <Home {...props} />} />
      <Redirect to="/" />
    </Switch>
  );

  if (!props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/cart" render={(props) => <Cart {...props} />} />
        <Route
          path="/detail-product/:productId"
          render={(props) => <Detail {...props} />}
        />
        <Route path="/register" render={(props) => <SignUp {...props} />} />
        <Route path="/abstract" render={(props) => <Abstract {...props} />} />
        <Route
          path="/contemporary"
          render={(props) => <Contemporary {...props} />}
        />
        <Route path="/cubism" render={(props) => <Cubism {...props} />} />
        <Route
          path="/expressionist"
          render={(props) => <Expressionist {...props} />}
        />
        <Route path="/realist" render={(props) => <Realist {...props} />} />
        <Route
          path="/surrealist"
          render={(props) => <Surrealist {...props} />}
        />
        <Route path="/" exact render={(props) => <Home {...props} />} />
        <Redirect
          to={
            localStorage.getItem("pathname")
              ? localStorage.getItem("pathname")
              : "/"
          }
        />
      </Switch>
    );
  }

  return <Suspense fallback={<LoadingBar />}>{routes}</Suspense>;
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    peoples: state.people.peoples,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoAuth: () => dispatch(actions.checkAutoAuth()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
