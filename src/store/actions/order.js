import * as actionTypes from "./actionTypes";
import axios from "../../axios-db";

export const orderStart = () => {
  return {
    type: actionTypes.ORDER_START,
  };
};

export const orderSuccess = (id, data) => {
  return {
    type: actionTypes.ORDER_SUCCESS,
    id,
    data,
  };
};

export const orderFail = (error) => {
  return {
    type: actionTypes.ORDER_FAIL,
    error,
  };
};

export const addingOrder = (token, id, data) => {
  return (dispatch) => {
    dispatch(orderStart());
    axios
      .post(`/peoples/${id}/orders.json?auth=${token}`, data)
      .then((response) => {
        dispatch(orderSuccess(response.data.name, data));
      })
      .catch((error) => {
        dispatch(orderFail(error));
      });
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};

export const fetchOrderSuccess = (data) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    data,
  };
};

export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error,
  };
};

export const initOrder = (token, id) => {
  return (dispatch) => {
    dispatch(orderStart());
    axios
      .get(`/peoples/${id}/orders.json?auth=${token}`)
      .then((response) => {
        const arrayData = [];
        for (const key in response.data) {
          arrayData.push({
            idOrder: key,
            ...response.data[key],
          });
        }
        dispatch(fetchOrderSuccess(arrayData));
      })
      .catch((error) => {
        dispatch(fetchOrderFail(error));
      });
  };
};
