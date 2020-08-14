import * as actionTypes from '../actionTypes';

const initialState = {
  employeeList: [],
  isEdit: false,
  selectedEdit: null,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EMPLOYEE_DATA: {
      const fetchedData = action.payload.map((obj) => ({
        id: obj.id,
        first_name: obj.first_name,
        last_name: obj.last_name,
        email: obj.email,
        avatar: obj.avatar,
      }));
      return {
        ...state,
        employeeList: fetchedData,
      };
    }

    case actionTypes.DELETE_EMPLOYEE_DATA: {
      const checkId = (obj) => (obj.id === action.id);
      const index = state.employeeList.findIndex(checkId);

      const newList = [...state.employeeList];
      newList.splice(index, 1);

      return {
        ...state,
        employeeList: newList,
      };
    }

    case actionTypes.EDIT_EMPLOYEE_DATA: {
      return {
        ...state,
        isEdit: true,
        selectedEdit: action.id,
      };
    }

    case actionTypes.SUBMIT_EDIT_EMPLOYEE_DATA: {
      const checkId = (obj) => (obj.id === action.id);
      const index = state.employeeList.findIndex(checkId);

      const newList = [...state.employeeList];
      const newObj = { ...newList[index] };

      newObj.first_name = action.first_name;
      newObj.last_name = action.last_name;
      newObj.email = action.email;
      newObj.avatar = action.avatar;

      newList[index] = newObj;

      return {
        ...state,
        employeeList: newList,
        isEdit: false,
      };
    }

    case actionTypes.CANCEL_EDIT_EMPLOYEE_DATA: {
      return {
        ...state,
        isEdit: false,
      };
    }

    default:
      return state;
  }
};

export default employeeReducer;
