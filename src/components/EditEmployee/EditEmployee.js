/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './EditEmployee.css';

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

  getEditObj = () => {
    const {
      editedObj: {
        first_name,
        last_name,
        email,
        avatar,
      },
    } = this.state;

    return (
      <ul className="UlEmpEdit">
        <li className="LiEmpEdit">
          First Name:
          <input type="text" className="InputEmpEdit" value={first_name} onChange={this.onChangeFirstName} />
        </li>
        <li className="LiEmpEdit">
          Last Name:
          <input type="text" className="InputEmpEdit" value={last_name} onChange={this.onChangeLastName} />
        </li>
        <li className="LiEmpEdit">
          Email:
          <input type="text" className="InputEmpEdit" value={email} onChange={this.onChangeEmail} />
        </li>
        <li className="LiEmpEdit">
          Profile pic url:
          <input type="text" className="InputEmpEdit" value={avatar} onChange={this.onChangeAvatar} />
        </li>
      </ul>
    );
  }

  getButtons = () => {
    const { cancelEdit } = this.props;
    const { isValid } = this.state;
    return (
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
    );
  };

  getEditbox = () => (
    <div className="EditObj">
      {this.getEditObj()}
      {this.getButtons()}
    </div>
  );

  render() {
    const {
      editedObj: {
        id,
        first_name,
        last_name,
        email,
        avatar,
      },
    } = this.state;
    return this.getEditbox(id, first_name, last_name, email, avatar);
  }
}

EditEmployee.propTypes = {
  cancelEdit: PropTypes.func.isRequired,
  submitEdit: PropTypes.func.isRequired,
};

export default EditEmployee;
