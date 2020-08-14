import axios from 'axios';
import * as actionTypes from '../actionTypes';

export const fetchEmployeeDataNext = (data) => ({
  type: actionTypes.FETCH_EMPLOYEE_DATA,
  payload: data,
});

export const fetchEmployeeData = () => (dispatch) => {
  axios
    .get('https://reqres.in/api/users')
    .then((responce) => {
      if (responce.status === 200) {
        const axiosList = [];
        const pages = responce.data.total_pages;

        for (let i = 1; i <= pages; i++) {
          axiosList.push(axios.get(`https://reqres.in/api/users?page=${i}`));
        }

        Promise.all(axiosList)
          .then((responces) => {
            let processedResponces = [];
            responces.map((responce) => {
              processedResponces = [...processedResponces, ...responce.data.data];
            });
            dispatch(fetchEmployeeDataNext(processedResponces));
          }).catch((error) => {
            console.log(error);
          });
      } else {
        console.log(responce);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteEmployeeDataNext = (id1) => ({
  type: actionTypes.DELETE_EMPLOYEE_DATA,
  id: id1,
});

export const deleteEmployeeData = (id) => (dispatch) => {
  axios.delete(`https://reqres.in/api/users/${id}`)
    .then((responce) => {
      if (responce.status === 204) {
        dispatch(deleteEmployeeDataNext(id));
      } else {
        console.log(responce);
      }
    }).catch((error) => {
      console.log(error);
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
    axios.post(`https://reqres.in/api/users/${obj.id}`, newobj)
      .then((responce) => {
        if (responce.status === 201) {
          dispatch(submitEditEmployeeDataNext(obj));
          // console.log(responce);
        } else {
          console.log(responce);
        }
      }).catch((error) => {
        console.log(error);
      });
  };
};

export const cancelEditEmployeeData = () => ({
  type: actionTypes.CANCEL_EDIT_EMPLOYEE_DATA,
});
