import * as actionTypes from "./actionTypes";
import axios from "../../axios-db";

export const peopleStart = () => {
  return {
    type: actionTypes.PEOPLE_START,
  };
};

export const peopleSuccess = (id, data) => {
  return {
    type: actionTypes.PEOPLE_SUCCESS,
    id,
    data,
  };
};

export const peopleFail = (error) => {
  return {
    type: actionTypes.PEOPLE_FAIL,
    error,
  };
};

export const addPeople = (token, data) => {
  return (dispatch) => {
    dispatch(peopleStart());
    axios
      .post("/peoples.json?auth=" + token, data)
      .then((response) => {
        dispatch(peopleSuccess(response.data.name, data));
      })
      .catch((error) => {
        dispatch(peopleFail(error.response.data.error));
      });
  };
};

export const editPeopleStart = () => {
  return {
    type: actionTypes.EDIT_PEOPLE_START,
  };
};

export const editPeopleSuccess = (data) => {
  return {
    type: actionTypes.EDIT_PEOPLE_SUCCESS,
    editData: data,
  };
};

export const editPeopleFail = (error) => {
  return {
    type: actionTypes.EDIT_PEOPLE_FAIL,
    error,
  };
};

export const editPeople = (token, data, id) => {
  return (dispatch) => {
    dispatch(editPeopleStart());
    axios
      .put(`peoples/${id}.json?auth=${token}`, data)
      .then((response) => {
        dispatch(editPeopleSuccess(data));
      })
      .catch((error) => {
        dispatch(editPeopleFail(error.response.data.error));
      });
  };
};

export const fetchPeopleStart = () => {
  return {
    type: actionTypes.FETCH_PEOPLE_START,
  };
};

export const fetchPeopleSuccess = (fetchData) => {
  return {
    type: actionTypes.FETCH_PEOPLE_SUCCESS,
    fetchData,
  };
};

export const fecthPeopleFail = (error) => {
  return {
    type: actionTypes.FETCH_PEOPLE_FAIL,
    error,
  };
};

export const fetchPeopleInit = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchPeopleStart());
    axios
      .get(`/peoples.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then((response) => {
        const arrayData = [];
        for (const key in response.data) {
          arrayData.push({
            id: key,
            ...response.data[key],
          });
        }
        dispatch(fetchPeopleSuccess(arrayData));
      })
      .catch((error) => {
        dispatch(fecthPeopleFail(error));
      });
  };
};
