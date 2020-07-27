import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  wishlists: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WISHLIST_START:
      return updateObject(state, { loading: true });
    case actionTypes.WISHLIST_SUCCESS:
      const newObject = updateObject(action.data, {
        idWishlist: action.id,
      });
      return updateObject(state, {
        wishlists: state.wishlists.concat(newObject),
        loading: false,
      });
    case actionTypes.WISHLIST_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.WISHLIST_REMOVE:
      return updateObject(state, {
        wishlists: state.wishlists.filter(
          (wishlist) => wishlist.idWishlist !== action.data
        ),
        loading: false,
      });
    case actionTypes.FETCH_WISHLIST_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_WISHLIST_SUCCESS:
      return updateObject(state, {
        wishlists: action.data,
        loading: false,
      });
    case actionTypes.FETCH_WISHLIST_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    default:
      return state;
  }
};

export default reducer;
