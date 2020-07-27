import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initState = {
  carts: [],
  quantity: 0,
  loading: false,
  error: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CART_START:
      return updateObject(state, { loading: true });
    case actionTypes.CART_SUCCESS:
      const newObject = updateObject(action.data, { idCart: action.id });
      return updateObject(state, {
        carts: state.carts.concat(newObject),
        quantity: state.quantity + 1,
        loading: false,
      });
    case actionTypes.CART_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.FETCH_CART_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_CART_SUCCESS:
      return updateObject(state, {
        carts: action.data,
        quantity: action.quantity,
        loading: false,
      });
    case actionTypes.FETCH_CART_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.CART_REMOVE:
      return updateObject(state, {
        carts: state.carts.filter((cart) => cart.idCart !== action.data),
        quantity: state.quantity - 1,
        loading: false,
      });
    default:
      return state;
  }
};

export default reducer;
