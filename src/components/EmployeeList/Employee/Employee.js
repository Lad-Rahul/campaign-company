/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Employee.css';
import editImg from '../../../assets/image/edit_image.png';
import deleteImg from '../../../assets/image/delete_image.png';

class Employee extends PureComponent {
    onClickDelete = () => {
      const { employeeObj: { id }, remove } = this.props;
      return remove(id);
    }

    onClickEdit = () => {
      const { employeeObj: { id }, edit } = this.props;
      return edit(id);
    }

  getListItem = (id, first_name, last_name, email, avatar) => (
    <li className="EmployeeItem" key={id}>
      <span className="LiFirstName">{first_name}</span>
      <span className="LiLastName">{last_name}</span>
      <span className="LiEmail">{email}</span>
      <span className="LiAvatar"><img src={avatar} alt={first_name} /></span>
      <span className="LiAction">
        <img className="LiImgEmp" src={editImg} alt="Edit" onClick={this.onClickEdit} />
        <img className="LiImgEmp" src={deleteImg} alt="Delete" onClick={this.onClickDelete} />
      </span>
    </li>
  )

  render() {
    const {
      employeeObj: {
        id, first_name, last_name, email, avatar,
      },
    } = this.props;
    return this.getListItem(id, first_name, last_name, email, avatar);
  }
}

Employee.propTypes = {
  employeeObj: PropTypes.object,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
};

Employee.defaultProps = {
  employeeObj: {},
};

export default Employee;
