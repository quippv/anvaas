import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_START:
      return updateObject(state, { loading: true });
    case actionTypes.ORDER_SUCCESS:
      const newObject = updateObject(action.data, {
        idOrder: action.id,
      });
      return updateObject(state, {
        orders: state.orders.concat(newObject),
        loading: false,
      });
    case actionTypes.ORDER_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.FETCH_ORDER_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_ORDER_SUCCESS:
      return updateObject(state, {
        orders: action.data,
        loading: false,
      });
    case actionTypes.FETCH_ORDER_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    default:
      return state;
  }
};

export default reducer;
