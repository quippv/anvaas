import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import authReducer from "./store/reducers/auth";
import peopleReducer from "./store/reducers/people";
import productReducer from "./store/reducers/product";
import cartReducer from "./store/reducers/cart";
import wishlistReducer from "./store/reducers/wishlist";
import orderReducer from "./store/reducers/order";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const reducers = combineReducers({
  auth: authReducer,
  people: peopleReducer,
  product: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  order: orderReducer,
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
