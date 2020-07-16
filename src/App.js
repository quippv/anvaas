import React, { Suspense } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import LoadingBar from "./components/UI/LoadingBar/LoadingBar";

const Home = React.lazy(() => {
  return import("./containers/Home/Home");
});

const Abstract = React.lazy(() => {
  return import("./containers/Abstract/Abstract");
});

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const SignUp = React.lazy(() => {
  return import("./containers/Auth/SignUp/SignUp");
});

const App = () => {
  const routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/register" render={(props) => <SignUp {...props} />} />
      <Route path="/abstract" render={(props) => <Abstract {...props} />} />
      <Route path="/" exact render={(props) => <Home {...props} />} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className="App">
      <Suspense fallback={<LoadingBar />}>{routes}</Suspense>
    </div>
  );
};

export default withRouter(App);
