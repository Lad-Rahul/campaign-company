/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import _map from 'lodash/map';
import { defaultMemoize } from 'reselect';
import PropTypes from 'prop-types';
import InputEditbox from './InputEditbox/InputEditbox';
import './Editbox.css';
import * as Constants from '../../constants';

class Editbox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editedItems: props.editList,
      isValid: true,
    };
  }

  onChangeHandler = defaultMemoize((event, id, inputbox) => {
    let valid = true;
    const { editedItems } = this.state;
    const updatedItems = _map(editedItems, (data) => {
      if (data.id === id && inputbox === 'name') {
        if (event.target.value.trim() === '') {
          valid = false;
        }
        return {
          ...data,
          name: event.target.value,
        };
      }
      if (data.id === id && inputbox === 'type') {
        if (event.target.value.trim() === '') {
          valid = false;
        }
        return {
          ...data,
          type: event.target.value,
        };
      }
      if (data.name.trim() === '') {
        valid = false;
      }
      if (data.type.trim() === '') {
        valid = false;
      }
      return {
        ...data,
      };
    });
    this.setState({ editedItems: updatedItems, isValid: valid });
  });

  onSubmitEdit = () => {
    const { editedItems } = this.state;
    const { submitEdit } = this.props;

    return submitEdit(editedItems);
  };

  getEditList = defaultMemoize((editedItems) => _map(editedItems, (data) => (
    <InputEditbox
      key={data.id}
      nameInput={data.name}
      typeInput={data.type}
      id={data.id}
      change={this.onChangeHandler}
    />
  )));

  getButtons = defaultMemoize((cancelEdit, isValid) => (
    <div>
      <input
        className="ButtonEditbox SubmitBtn"
        type="button"
        value="Submit"
        onClick={this.onSubmitEdit}
        disabled={!isValid}
      />
      <input
        className="ButtonEditbox CancelBtn"
        type="button"
        value="cancel"
        onClick={cancelEdit}
      />
    </div>
  ));

  getEditbox = defaultMemoize((editedItems, cancelEdit, isValid) => {
    if (editedItems.length === 0) {
      return (<p><strong>{Constants.NOT_SELECTED}</strong></p>);
    }
    return (
      <div className="Editbox">
        {this.getEditList(editedItems)}
        {this.getButtons(cancelEdit, isValid)}
      </div>
    );
  });

  render() {
    const { editedItems, isValid } = this.state;
    const { cancelEdit } = this.props;
    return this.getEditbox(editedItems, cancelEdit, isValid);
  }
}

Editbox.propTypes = {
  editList: PropTypes.array.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  submitEdit: PropTypes.func.isRequired,
};

export default Editbox;
