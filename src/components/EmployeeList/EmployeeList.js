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
import Loader from '../Loader/Loader';
import * as Constants from '../../constants';
import './EmployeeList.css';

class EmployeeList extends PureComponent {
  showTotal = defaultMemoize((totalEmployees) => <p className="Total">{Constants.TOTAL_EMPLOYEES + totalEmployees}</p>);

  componentDidMount() {
    const { onFetchEmployeeData } = this.props;
    const { currentPage, itemsPerPage } = this.props;
    onFetchEmployeeData(currentPage, itemsPerPage);
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

  getPagination = defaultMemoize((currentPage, itemsPerPage, total, onFetchEmployeeData) => (
    <Pagination
      itemsPerPage={itemsPerPage}
      totalItems={total}
      paginate={onFetchEmployeeData}
      activePage={currentPage}
    />
  ));

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
    const { currentPage, itemsPerPage } = this.props;
    const {
      onFetchEmployeeData, employeeList, isEdit, selectedEdit, totalEmployees, isLoading, onDeleteEmployeeData, onEditEmployeeData,
      onSubmitEditEmployeeData, onCancelEditEmployeeData, isError, error,
    } = this.props;

    const currentEmployeeList = employeeList;
    if (isLoading) return <Loader />;

    if (isError) return <p>{error}</p>;

    return (
      <div>
        {this.showTotal(totalEmployees)}
        {this.getHeadingEmp()}
        {this.getEmployeeList(currentEmployeeList, onDeleteEmployeeData, onEditEmployeeData)}
        {this.getPagination(currentPage, itemsPerPage, totalEmployees, onFetchEmployeeData)}
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
  totalEmployees: state.employee.totalEmployees,
  selectedEdit: state.employee.selectedEdit,
  isLoading: state.employee.isLoading,
  currentPage: state.employee.currentPage,
  itemsPerPage: state.employee.itemsPerPage,
  isError: state.employee.isError,
  error: state.employee.error,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchEmployeeData: (currentPage, itemsPerPage) => dispatch(actionCreaters.fetchEmployeeData(currentPage, itemsPerPage)),
  onDeleteEmployeeData: (id) => dispatch(actionCreaters.deleteEmployeeData(id)),
  onEditEmployeeData: (id) => dispatch(actionCreaters.editEmployeeData(id)),
  onSubmitEditEmployeeData: (obj) => dispatch(actionCreaters.submitEditEmployeeData(obj)),
  onCancelEditEmployeeData: () => dispatch(actionCreaters.cancelEditEmployeeData()),
});

EmployeeList.propTypes = {
  isEdit: PropTypes.bool,
  selectedEdit: PropTypes.number,
  isLoading: PropTypes.bool,
  totalEmployees: PropTypes.number,
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  employeeList: PropTypes.array,
  isError: PropTypes.bool,
  error: PropTypes.string,
  onFetchEmployeeData: PropTypes.func.isRequired,
  onDeleteEmployeeData: PropTypes.func.isRequired,
  onEditEmployeeData: PropTypes.func.isRequired,
  onSubmitEditEmployeeData: PropTypes.func.isRequired,
  onCancelEditEmployeeData: PropTypes.func.isRequired,
};

EmployeeList.defaultProps = {
  employeeList: [],
  isEdit: false,
  selectedEdit: null,
  isLoading: false,
  totalEmployees: 0,
  currentPage: 1,
  itemsPerPage: 3,
  isError: false,
  error: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
