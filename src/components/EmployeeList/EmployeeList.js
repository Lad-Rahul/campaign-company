/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import { defaultMemoize } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreaters from '../../store/actions';
import Employee from './Employee/Employee';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import EditEmployee from '../EditEmployee/EditEmployee';
import * as Constants from '../../constants';
import './EmployeeList.css';

class EmployeeList extends PureComponent {
  showTotal = defaultMemoize((totalEmployees) => <p className="Total">{Constants.TOTAL_EMPLOYEES + totalEmployees}</p>);

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      itemsPerPage: 3,
    };
  }

  componentDidMount() {
    const { onFetchEmployeeData } = this.props;
    onFetchEmployeeData();
  }

  getHeadingEmp = () => (
    <div className="ListHeadingEmp">
      <div className="HeadingItemsEmp">
        <span className="HeadingFirstName">{Constants.FIRST_NAME}</span>
        <span className="HeadingLastName">{Constants.LAST_NAME}</span>
        <span className="HeadingEmail">{Constants.EMAIL}</span>
        <span className="HeadingAvatar">{Constants.PROFILE_PICTURE}</span>
        <span className="HeadingAction">{Constants.ACTIONS}</span>
      </div>
    </div>
  );

  getEmployeeList = defaultMemoize(
    (currentEmployeeList, onDeleteEmployeeData, onEditEmployeeData) => {
      if (!currentEmployeeList || currentEmployeeList.length === 0) {
        return (<p><strong>{Constants.NOT_FOUND}</strong></p>);
      }
      return (
        <ul className="ListItemsEmp">
          {
          _map(currentEmployeeList, (obj) => (
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
    },
  )

  getPagination = defaultMemoize((itemsPerPage, total) => (
    <Pagination
      itemsPerPage={itemsPerPage}
      totalItems={total}
      paginate={this.paginate}
    />
  ));

  paginate = (pageNo) => {
    this.setState({ currentPage: pageNo });
  }

  getModal = (
    currentEmployeeList,
    isEdit,
    selectedEdit,
    onSubmitEditEmployeeData,
    onCancelEditEmployeeData,
  ) => (
    <Modal show={isEdit} close={onCancelEditEmployeeData}>
      <EditEmployee
        editObj={_filter(currentEmployeeList, (obj) => (obj.id === selectedEdit))[0]}
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
          {this.showTotal(employeeList.length)}
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
  selectedEdit: PropTypes.number,
  employeeList: PropTypes.array.isRequired,
  onFetchEmployeeData: PropTypes.func.isRequired,
  onDeleteEmployeeData: PropTypes.func.isRequired,
  onEditEmployeeData: PropTypes.func.isRequired,
  onSubmitEditEmployeeData: PropTypes.func.isRequired,
  onCancelEditEmployeeData: PropTypes.func.isRequired,
};

EmployeeList.defaultProps = {
  isEdit: false,
  selectedEdit: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
