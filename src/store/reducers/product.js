import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  products: [],
  loading: false,
  error: null,
  productRedirectPath: "/detail-product",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_START:
      return updateObject(state, { loading: true });
    case actionTypes.PRODUCT_SUCCESS:
      const newObject = updateObject(action.dataForm, { id: action.id });
      return updateObject(state, {
        products: state.products.concat(newObject),
        loading: false,
      });
    case actionTypes.PRODUCT_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.PRODUCT_REMOVE:
      return updateObject(state, {
        products: state.products.filter(
          (product) => product.id !== action.data
        ),
        loading: false,
      });
    case actionTypes.FETCH_PRODUCT_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_PRODUCT_SUCCESS:
      return updateObject(state, {
        products: action.data,
        loading: false,
      });
    case actionTypes.FETCH_PRODUCT_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.PRODUCT_REDIRECT_PATH:
      return updateObject(state, { productRedirectPath: action.path });
    default:
      return state;
  }
};

export default reducer;
