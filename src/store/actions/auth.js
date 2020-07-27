import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (userId, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expiredIn");
  localStorage.removeItem("pathname");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authTimeout = (expiresTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expiresTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let authUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-1g3YbVrxsJTC8vAdmbT61TZ0pt5fYX4";

    if (!isSignUp) {
      authUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-1g3YbVrxsJTC8vAdmbT61TZ0pt5fYX4";
    }

    axios
      .post(authUrl, authData)
      .then((response) => {
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem(
          "expiredIn",
          new Date(new Date().getTime() + response.data.expiresIn * 1000)
        );
        dispatch(authSuccess(response.data.localId, response.data.idToken));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.AUTH_REDIRECT_PATH,
    path,
  };
};

export const checkAutoAuth = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      const expiredDate = new Date(localStorage.getItem("expiredIn"));
      if (expiredDate <= new Date()) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(userId, token));
        dispatch(
          authTimeout((expiredDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
