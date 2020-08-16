/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './EditEmployee.css';
import { defaultMemoize } from 'reselect';
import * as Constants from '../../constants';

class EditEmployee extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editedObj: props.editObj,
      isValid: true,
    };
  }

  onChangeHandler = (event, inputType) => {
    const { editedObj } = this.state;
    let valid = false;
    const newObj = { ...editedObj };
    if (inputType === 'first_name') {
      newObj.first_name = event.target.value;
    } else if (inputType === 'last_name') {
      newObj.last_name = event.target.value;
    } else if (inputType === 'email') {
      newObj.email = event.target.value;
    } else if (inputType === 'avatar') {
      newObj.avatar = event.target.value;
    }
    if (newObj.first_name.trim() !== '' && newObj.last_name.trim() !== '' && newObj.email.trim() !== '' && newObj.avatar.trim() !== '') {
      valid = true;
    }
    this.setState({ editedObj: newObj, isValid: valid });
  }

  onChangeFirstName = (event) => this.onChangeHandler(event, 'first_name')

  onChangeLastName = (event) => this.onChangeHandler(event, 'last_name')

  onChangeEmail = (event) => this.onChangeHandler(event, 'email')

  onChangeAvatar = (event) => this.onChangeHandler(event, 'avatar')

  onSubmitEdit = () => {
    const { editedObj } = this.state;
    const { submitEdit } = this.props;

    return submitEdit(editedObj);
  }

  getEditObj = defaultMemoize(({
    first_name, last_name, email, avatar,
  }) => (
    <ul className="UlEmpEdit">
      <li className="LiEmpEdit">
        {Constants.FIRST_NAME}
        <input type="text" className="InputEmpEdit" value={first_name} onChange={this.onChangeFirstName} />
      </li>
      <li className="LiEmpEdit">
        {Constants.LAST_NAME}
        <input type="text" className="InputEmpEdit" value={last_name} onChange={this.onChangeLastName} />
      </li>
      <li className="LiEmpEdit">
        {Constants.EMAIL}
        <input type="text" className="InputEmpEdit" value={email} onChange={this.onChangeEmail} />
      </li>
      <li className="LiEmpEdit">
        {Constants.PROFILE_PIC_URL}
        <input type="text" className="InputEmpEdit" value={avatar} onChange={this.onChangeAvatar} />
      </li>
    </ul>
  ));

  getButtons = defaultMemoize((isValid, cancelEdit) => (
    <div>
      <input
        className="ButtonEditObj SubmitBtn"
        type="button"
        value="Submit"
        onClick={this.onSubmitEdit}
        disabled={!isValid}
      />
      <input
        className="ButtonEditObj CancelBtn"
        type="button"
        value="cancel"
        onClick={cancelEdit}
      />
    </div>
  ));

  getEditbox = defaultMemoize((editedObj, isValid, cancelEdit) => (
    <div className="EditObj">
      {this.getEditObj(editedObj)}
      {this.getButtons(isValid, cancelEdit)}
    </div>
  ));

  render() {
    const { editedObj, isValid } = this.state;
    const { cancelEdit } = this.props;
    return this.getEditbox(editedObj, isValid, cancelEdit);
  }
}

EditEmployee.propTypes = {
  editObj: PropTypes.object,
  cancelEdit: PropTypes.func.isRequired,
  submitEdit: PropTypes.func.isRequired,
};

EditEmployee.defaultProps = {
  editObj: {},
};

export default EditEmployee;
