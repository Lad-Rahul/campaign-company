import * as actionTypes from '../actionTypes';
import data from '../../data/data.json';

const initialState = {
  campaignList: [],
  isEdit: false,
  anyChecked: false,
};

const getCurrentTime = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Satur'];
  const d = new Date();
  const day = days[d.getDay()];
  let hr = d.getHours();
  let min = d.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let ampm = 'am';
  if (hr > 12) {
    hr -= 12;
    ampm = 'pm';
  }
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const currTime = `${day} ${date} ${month} ${year} ${hr}:${min}${ampm}`;
  return currTime;
};

const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA: {
      const storedData = data.map((obj) => ({
        // eslint-disable-next-line no-underscore-dangle
        id: obj._id,
        name: obj.name,
        type: obj.type,
        lastSaved: 'Fri 14 Aug 2020 00:00am',
        isChecked: false,
      }));

      return {
        ...state,
        campaignList: storedData,
      };
    }

    case actionTypes.DELETE_DATA: {
      const checkId = (obj) => (obj.id === action.id);
      const index = state.campaignList.findIndex(checkId);

      const newList = [...state.campaignList];
      newList.splice(index, 1);
      return {
        ...state,
        campaignList: newList,
      };
    }

    case actionTypes.EDIT_CLICKED: {
      const newList = state.campaignList.map((obj) => {
        if (obj.id === action.id) {
          return {
            ...obj,
            isChecked: true,
          };
        }

        return {
          ...obj,
          isChecked: false,
        };
      });
      return {
        ...state,
        campaignList: newList,
        isEdit: true,
      };
    }

    case actionTypes.CANCEL_EDIT: {
      return {
        ...state,
        isEdit: false,
      };
    }

    case actionTypes.CHANGE_CHECKBOX_STATUS: {
      const checkId = (obj) => (obj.id === action.id);
      const index = state.campaignList.findIndex(checkId);

      const newList = [...state.campaignList];
      const newobj = { ...newList[index] };
      newobj.isChecked = action.value;
      newList[index] = newobj;

      return {
        ...state,
        campaignList: newList,
      };
    }

    case actionTypes.EDIT_MULTIPLE_CLICKED: {
      return {
        ...state,
        isEdit: true,
      };
    }

    case actionTypes.SUBMIT_EDIT: {
      const newList = [...state.campaignList];

      action.updatedList.map((obj) => {
        const currentTime = getCurrentTime();

        const checkId = (obj1) => (obj1.id === obj.id);
        const index = newList.findIndex(checkId);
        const newobj = { ...newList[index] };

        newobj.name = obj.name;
        newobj.type = obj.type;
        newobj.isChecked = false;
        newobj.lastSaved = currentTime;

        newList[index] = newobj;
        return obj;
      });

      return {
        ...state,
        campaignList: newList,
        isEdit: false,
      };
    }

    default: return state;
  }
};

export default campaignReducer;
