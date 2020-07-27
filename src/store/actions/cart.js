import * as actionTypes from "./actionTypes";
import axios from "../../axios-db";

export const cartStart = () => {
  return {
    type: actionTypes.CART_START,
  };
};

export const cartSuccess = (id, data) => {
  return {
    type: actionTypes.CART_SUCCESS,
    id,
    data,
  };
};

export const cartFail = (error) => {
  return {
    type: actionTypes.CART_FAIL,
    error,
  };
};

export const cartAdded = (token, id, data) => {
  return (dispatch) => {
    dispatch(cartStart());
    axios
      .post(`/peoples/${id}/carts.json?auth=${token}`, data)
      .then((response) => {
        dispatch(cartSuccess(response.data.name, data));
      })
      .catch((error) => {
        dispatch(cartFail(error));
      });
  };
};

export const fetchCartStart = () => {
  return {
    type: actionTypes.FETCH_CART_START,
  };
};

export const fetchCartSuccess = (data, quantity) => {
  return {
    type: actionTypes.FETCH_CART_SUCCESS,
    data,
    quantity,
  };
};

export const fetchCartFail = (error) => {
  return {
    type: actionTypes.FETCH_CART_FAIL,
    error,
  };
};

export const cartInit = (token, id) => {
  return (dispatch) => {
    dispatch(cartStart());
    axios
      .get(`/peoples/${id}/carts.json?auth=${token}`)
      .then((response) => {
        const arrayData = [];
        for (const key in response.data) {
          arrayData.push({
            idCart: key,
            ...response.data[key],
          });
        }
        dispatch(fetchCartSuccess(arrayData, arrayData.length));
      })
      .catch((error) => {
        dispatch(fetchCartFail(error));
      });
  };
};

export const cartRemove = (data) => {
  return {
    type: actionTypes.CART_REMOVE,
    data,
  };
};

export const cartRemoveDb = (token, idPeople, id) => {
  return (dispatch) => {
    dispatch(cartStart());
    axios
      .delete(`/peoples/${idPeople}/carts/${id}.json?auth=${token}`)
      .then((response) => {
        dispatch(cartRemove(id));
      })
      .catch((error) => {
        dispatch(cartFail(error));
      });
  };
};
