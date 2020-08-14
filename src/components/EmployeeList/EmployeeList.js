/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreaters from '../../store/actions';
import Employee from './Employee/Employee';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import EditEmployee from '../EditEmployee/EditEmployee';
import './EmployeeList.css';

class EmployeeList extends PureComponent {
  constructor(props) {
    super(props);
    const { onFetchEmployeeData } = this.props;
    onFetchEmployeeData();
    this.state = {
      currentPage: 1,
      itemsPerPage: 3,
    };
  }

  getHeadingEmp = () => (
    <div className="ListHeadingEmp">
      <div className="HeadingItemsEmp">
        <span className="HeadingFirstName">First Name</span>
        <span className="HeadingLastName">Last Name</span>
        <span className="HeadingEmail">Email</span>
        <span className="HeadingAvatar">Profile Picture</span>
        <span className="HeadingAction">Actions</span>
      </div>
    </div>
  )

  getEmployeeList = (currentCampaignList, onDeleteEmployeeData, onEditEmployeeData) => {
    if (!currentCampaignList || currentCampaignList.length === 0) {
      return (<p><strong>Not found!</strong></p>);
    }
    return (
      <ul className="ListItemsEmp">
        {
          currentCampaignList.map((obj) => (
            <Employee
              key={obj.id}
              employeeObj={obj}
              remove={onDeleteEmployeeData}
              edit={onEditEmployeeData}
            />
          ))
        }
      </ul>
    );
  }

  paginate = (pageNo) => {
    this.setState({ currentPage: pageNo });
  }

  getPagination = (itemsPerPage, total) => (
    <Pagination
      itemsPerPage={itemsPerPage}
      totalItems={total}
      paginate={this.paginate}
    />
  );

  getModal = (
    currentEmployeeList,
    isEdit,
    selectedEdit,
    onSubmitEditEmployeeData,
    onCancelEditEmployeeData,
  ) => (
    <Modal show={isEdit} close={onCancelEditEmployeeData}>
      <EditEmployee
        editObj={currentEmployeeList.filter((obj) => (obj.id === selectedEdit))[0]}
        submitEdit={onSubmitEditEmployeeData}
        cancelEdit={onCancelEditEmployeeData}
      />
    </Modal>
  )

  render() {
    const { currentPage, itemsPerPage } = this.state;
    const {
      employeeList, isEdit, selectedEdit, onDeleteEmployeeData, onEditEmployeeData,
      onSubmitEditEmployeeData, onCancelEditEmployeeData,
    } = this.props;
    // console.log(employeeList);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEmployeeList = employeeList.slice(indexOfFirstItem, indexOfLastItem);
    return (
      <div>
        {this.getHeadingEmp()}
        {this.getEmployeeList(currentEmployeeList, onDeleteEmployeeData, onEditEmployeeData)}
        {this.getPagination(itemsPerPage, employeeList.length)}
        {this.getModal(
          currentEmployeeList,
          isEdit,
          selectedEdit,
          onSubmitEditEmployeeData,
          onCancelEditEmployeeData,
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  employeeList: state.employee.employeeList,
  isEdit: state.employee.isEdit,
  selectedEdit: state.employee.selectedEdit,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchEmployeeData: () => dispatch(actionCreaters.fetchEmployeeData()),
  onDeleteEmployeeData: (id) => dispatch(actionCreaters.deleteEmployeeData(id)),
  onEditEmployeeData: (id) => dispatch(actionCreaters.editEmployeeData(id)),
  onSubmitEditEmployeeData: (obj) => dispatch(actionCreaters.submitEditEmployeeData(obj)),
  onCancelEditEmployeeData: () => dispatch(actionCreaters.cancelEditEmployeeData()),
});

EmployeeList.propTypes = {
  isEdit: PropTypes.bool,
  employeeList: PropTypes.array.isRequired,
  onFetchEmployeeData: PropTypes.func.isRequired,
  onDeleteEmployeeData: PropTypes.func.isRequired,
  onEditEmployeeData: PropTypes.func.isRequired,
  onSubmitEditEmployeeData: PropTypes.func.isRequired,
  onCancelEditEmployeeData: PropTypes.func.isRequired,
};

EmployeeList.defaultProps = {
  isEdit: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
