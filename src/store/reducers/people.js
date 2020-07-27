import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  peoples: [],
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PEOPLE_START:
      return updateObject(state, { loading: true });
    case actionTypes.PEOPLE_SUCCESS:
      const newObject = updateObject(action.data, { id: action.id });
      return updateObject(state, {
        peoples: state.peoples.concat(newObject),
        loading: false,
      });
    case actionTypes.PEOPLE_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.EDIT_PEOPLE_START:
      return updateObject(state, { loading: true });
    case actionTypes.EDIT_PEOPLE_SUCCESS:
      return updateObject(state, {
        peoples: [
          updateObject(state.peoples[0], {
            ...action.editData,
          }),
        ],
        loading: false,
      });
    case actionTypes.EDIT_PEOPLE_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    case actionTypes.FETCH_PEOPLE_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_PEOPLE_SUCCESS:
      return updateObject(state, {
        peoples: action.fetchData,
        loading: false,
      });
    case actionTypes.FETCH_PEOPLE_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, { peoples: [] });
    default:
      return state;
  }
};

export default reducer;
