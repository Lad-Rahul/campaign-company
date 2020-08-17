import axios from 'axios';
import * as actionTypes from '../actionTypes';

export const fetchEmployeeDataNext = (data, currentPage1, itemsPerPage1) => ({
  type: actionTypes.FETCH_EMPLOYEE_DATA,
  payload: data.data,
  total: data.total,
  currentPage: currentPage1,
  itemsPerPage: itemsPerPage1,
});

export const changeLoadingStatus = (value) => ({
  type: actionTypes.SET_LOADING_STATUS,
  loading: value,
});

export const displayError = (error1) => ({
  type: actionTypes.DISPLAY_ERROR,
  error: error1,
});

export const fetchEmployeeData = (currentPage, itemsPerPage) => (dispatch) => {
  dispatch(changeLoadingStatus(true));
  axios
    .get(`https://reqres.in/api/users?per_page=${itemsPerPage}?&page=${currentPage}`)
    .then((responce) => {
      dispatch(fetchEmployeeDataNext(responce.data, currentPage, itemsPerPage));
    })
    .catch((error) => {
      dispatch(displayError(error));
    });
};

export const deleteEmployeeDataNext = (id1) => ({
  type: actionTypes.DELETE_EMPLOYEE_DATA,
  id: id1,
});

export const deleteEmployeeData = (id) => (dispatch) => {
  dispatch(changeLoadingStatus(true));
  axios.delete(`https://reqres.in/api/users/${id}`)
    .then((responce) => {
      if (responce.status === 204) {
        dispatch(deleteEmployeeDataNext(id));
      }
    }).catch((error) => {
      dispatch(displayError(error));
    });
};

export const editEmployeeData = (id1) => ({
  type: actionTypes.EDIT_EMPLOYEE_DATA,
  id: id1,
});

export const submitEditEmployeeDataNext = (obj) => ({
  type: actionTypes.SUBMIT_EDIT_EMPLOYEE_DATA,
  id: obj.id,
  first_name: obj.first_name,
  last_name: obj.last_name,
  email: obj.email,
  avatar: obj.avatar,
});

export const submitEditEmployeeData = (obj) => {
  const newobj = {
    first_name: obj.first_name,
    last_name: obj.last_name,
    email: obj.email,
    avatar: obj.avatar,
  };
  return (dispatch) => {
    dispatch(changeLoadingStatus(true));
    axios.post(`https://reqres.in/api/users/${obj.id}`, newobj)
      .then((responce) => {
        if (responce.status === 201) {
          dispatch(submitEditEmployeeDataNext(obj));
          // console.log(responce);
        }
      }).catch((error) => {
        dispatch(displayError(error));
      });
  };
};

export const cancelEditEmployeeData = () => ({
  type: actionTypes.CANCEL_EDIT_EMPLOYEE_DATA,
});
