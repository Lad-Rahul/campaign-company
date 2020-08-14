import * as actionTypes from '../actionTypes';

export const fetchData = () => ({
  type: actionTypes.FETCH_DATA,
});

export const deleteData = (id1) => ({
  type: actionTypes.DELETE_DATA,
  id: id1,
});

export const editClicked = (id1) => ({
  type: actionTypes.EDIT_CLICKED,
  id: id1,
});

export const submitEdit = (updatedCampaignList) => ({
  type: actionTypes.SUBMIT_EDIT,
  updatedList: updatedCampaignList,
});

export const cancelEdit = () => ({
  type: actionTypes.CANCEL_EDIT,
});

export const changeCheckboxStatus = (id1, isChecked) => ({
  type: actionTypes.CHANGE_CHECKBOX_STATUS,
  id: id1,
  value: isChecked,
});

export const editMultipleClicked = () => ({
  type: actionTypes.EDIT_MULTIPLE_CLICKED,
});
