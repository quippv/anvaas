import * as actionTypes from "./actionTypes";
import axios from "../../axios-db";

export const wishlistStart = () => {
  return {
    type: actionTypes.WISHLIST_START,
  };
};

export const wishlistSuccess = (id, data) => {
  return {
    type: actionTypes.WISHLIST_SUCCESS,
    id,
    data,
  };
};

export const wishlistFail = (error) => {
  return {
    type: actionTypes.WISHLIST_FAIL,
    error,
  };
};

export const addingWishlist = (token, id, data) => {
  return (dispatch) => {
    dispatch(wishlistStart());
    axios
      .post(`/peoples/${id}/wishlists.json?auth=${token}`, data)
      .then((response) => {
        dispatch(wishlistSuccess(response.data.name, data));
      })
      .catch((error) => {
        dispatch(wishlistFail(error));
      });
  };
};

export const fetchWishlistStart = () => {
  return {
    type: actionTypes.FETCH_WISHLIST_START,
  };
};

export const fetchWishlistSuccess = (data) => {
  return {
    type: actionTypes.FETCH_WISHLIST_SUCCESS,
    data,
  };
};

export const fetchWishlistFail = (error) => {
  return {
    type: actionTypes.FETCH_WISHLIST_FAIL,
    error,
  };
};

export const initWishlist = (token, id) => {
  return (dispatch) => {
    dispatch(wishlistStart());
    axios
      .get(`/peoples/${id}/wishlists.json?auth=${token}`)
      .then((response) => {
        const arrayData = [];
        for (const key in response.data) {
          arrayData.push({
            idWishlist: key,
            ...response.data[key],
          });
        }
        dispatch(fetchWishlistSuccess(arrayData));
      })
      .catch((error) => {
        dispatch(fetchWishlistFail(error));
      });
  };
};

export const wishlistRemove = (data) => {
  return {
    type: actionTypes.WISHLIST_REMOVE,
    data,
  };
};

export const wishlistRemoveDb = (token, idPeople, id) => {
  return (dispatch) => {
    dispatch(wishlistStart());
    axios
      .delete(`/peoples/${idPeople}/wishlists/${id}.json?auth=${token}`)
      .then((response) => {
        dispatch(wishlistRemove(id));
      })
      .catch((error) => {
        dispatch(wishlistFail(error));
      });
  };
};
