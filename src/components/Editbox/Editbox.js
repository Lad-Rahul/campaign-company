/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InputEditbox from './InputEditbox/InputEditbox';
import './Editbox.css';

class Editbox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editedItems: props.editList,
      isValid: true,
    };
  }

  onChangeHandler = (event, id, inputbox) => {
    let valid = true;
    const { editedItems } = this.state;
    const updatedItems = editedItems.map((data) => {
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
  };

  onSubmitEdit = () => {
    const { editedItems } = this.state;
    const { submitEdit } = this.props;

    return submitEdit(editedItems);
  };

  getEditList = (editedItems) => editedItems.map((data) => (
    <InputEditbox
      key={data.id}
      nameInput={data.name}
      typeInput={data.type}
      id={data.id}
      change={this.onChangeHandler}
    />
  ));

  getButtons = (cancelEdit) => {
    const { isValid } = this.state;
    return (
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
    );
  };

  getEditbox = () => {
    const { editedItems } = this.state;
    const { cancelEdit } = this.props;
    if (editedItems.length === 0) {
      return (<p>No Items Selected</p>);
    }
    return (
      <div className="Editbox">
        {this.getEditList(editedItems)}
        {this.getButtons(cancelEdit)}
      </div>
    );
  };

  render() {
    return this.getEditbox();
  }
}

Editbox.propTypes = {
  editList: PropTypes.array.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  submitEdit: PropTypes.func.isRequired,
};

export default Editbox;
