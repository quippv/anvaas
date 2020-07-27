import axios from "../../axios-db";
import * as actionTypes from "./actionTypes";

export const fetchProductStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_START,
  };
};

export const fetchProductSuccess = (data) => {
  return {
    type: actionTypes.FETCH_PRODUCT_SUCCESS,
    data,
  };
};

export const fetchProductFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCT_FAIL,
    error,
  };
};

export const setProductRedirectPath = (path) => {
  return {
    type: actionTypes.PRODUCT_REDIRECT_PATH,
    path,
  };
};

export const fetchProductInit = () => {
  return (dispatch) => {
    dispatch(fetchProductStart());
    axios
      .get("/products.json?")
      .then((response) => {
        const arrayData = [];
        for (const key in response.data) {
          arrayData.push({
            id: key,
            ...response.data[key],
          });
        }
        dispatch(fetchProductSuccess(arrayData));
      })
      .catch((error) => {
        dispatch(fetchProductFail(error));
      });
  };
};

export const fetchProductDetail = (id) => {
  return (dispatch) => {
    dispatch(fetchProductStart());
    axios
      .get(`/products/${id}.json`)
      .then((response) => {
        const arrayData = [
          {
            id,
            ...response.data,
          },
        ];
        dispatch(fetchProductSuccess(arrayData));
      })
      .catch((error) => {
        dispatch(fetchProductFail(error.response.data.error));
      });
  };
};

export const fetchProductPortfolio = (userId) => {
  return (dispatch) => {
    dispatch(fetchProductStart());
    axios
      .get(`/products.json?orderBy="userId"&equalTo="${userId}"`)
      .then((response) => {
        const arrayData = [];
        for (const key in response.data) {
          arrayData.push({
            id: key,
            ...response.data[key],
          });
        }
        dispatch(fetchProductSuccess(arrayData));
      })
      .catch((error) => {
        dispatch(fetchProductFail(error.response.data.error));
      });
  };
};

export const productStart = () => {
  return {
    type: actionTypes.PRODUCT_START,
  };
};

export const productSuccess = (id, dataForm) => {
  return {
    type: actionTypes.PRODUCT_SUCCESS,
    id,
    dataForm,
  };
};

export const productFail = (error) => {
  return {
    type: actionTypes.PRODUCT_FAIL,
    error,
  };
};

export const productAddInit = (token, data) => {
  return (dispatch) => {
    dispatch(productStart());
    axios
      .post("/products.json?auth=" + token, data)
      .then((response) => {
        dispatch(productSuccess(response.data.name, data));
      })
      .then((error) => {
        dispatch(productFail(error));
      });
  };
};

export const productRemove = (data) => {
  return {
    type: actionTypes.PRODUCT_REMOVE,
    data,
  };
};

export const productRemoveDb = (token, id) => {
  return (dispatch) => {
    dispatch(productStart());
    axios
      .delete(`/products/${id}.json?auth=${token}`)
      .then((response) => {
        dispatch(productRemove(id));
      })
      .catch((error) => {
        dispatch(productFail(error));
      });
  };
};
