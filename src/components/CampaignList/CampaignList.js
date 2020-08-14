/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreaters from '../../store/actions';
import Campaign from '../Campaign/Campaign';

import Searchbar from '../Searchbar/Searchbar';
import './CampaignList.css';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import Editbox from '../Editbox/Editbox';
import { editImg } from '../../assets/image/edit_image.png';

class CampaignList extends PureComponent {
  constructor(props) {
    super(props);
    const { onFetchData } = this.props;
    onFetchData();
    this.state = {
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: '',
    };
  }

  onClickSearch = (query) => {
    this.setState({ searchQuery: query.trim() });
  }

  applyfilter = (chempaignList, searchQuery) => {
    if (!searchQuery) return chempaignList;

    const newList = chempaignList.filter((obj) => {
      const name = obj.name.toLowerCase();
      const type = obj.type.toLowerCase();
      const qry = searchQuery.toLowerCase();
      if (name.includes(qry)) return true;
      if (type.includes(qry)) return true;
      return false;
    });

    return newList;
  }

  getHeading = (onClickMultipleEdit) => (
    <div className="ListHeading">
      <div className="HeadingItems">
        <span className="HeadingCheckbox">
          <span onClick={onClickMultipleEdit} className="span">
            <img src={editImg} className="EditImg1" alt="EDIT Selected" />
          </span>
        </span>
        <span className="HeadingName">Campaign Name</span>
        <span className="HeadingType">Type</span>
        <span className="HeadingTime">Last saved</span>
        <span className="HeadingAction">Actions</span>
      </div>
    </div>
  )

  getCampaignList = (currentCampaignList, onDeleteData, onClickEditData, onChangeCheckbox) => {
    if (!currentCampaignList || currentCampaignList.length === 0) {
      return (<p><strong>Not found!</strong></p>);
    }
    return (
      <ul className="ListItems">
        {
          currentCampaignList.map((obj) => (
            <Campaign
              key={obj.id}
              campaignObj={obj}
              remove={onDeleteData}
              edit={onClickEditData}
              change={onChangeCheckbox}
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

  getModal = (currentCampaignList, isEdit, onClickSubmitEdit, onClickCancelEdit) => (
    <Modal show={isEdit} close={onClickCancelEdit}>
      <Editbox
        editList={currentCampaignList.filter((obj) => (obj.isChecked === true))}
        submitEdit={onClickSubmitEdit}
        cancelEdit={onClickCancelEdit}
      />
    </Modal>
  )

  render() {
    const {
      campaignList,
      isEdit,
      onDeleteData,
      onClickEditData,
      onClickSubmitEdit,
      onClickCancelEdit,
      onClickMultipleEdit,
      onChangeCheckbox,
    } = this.props;
    const { currentPage, itemsPerPage, searchQuery } = this.state;

    const filteredCampaignList = this.applyfilter(campaignList, searchQuery);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCampaignList = filteredCampaignList.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="CampaignList">
        <Searchbar search={this.onClickSearch} />
        {this.getHeading(onClickMultipleEdit)}
        {this.getCampaignList(currentCampaignList, onDeleteData, onClickEditData, onChangeCheckbox)}
        {this.getPagination(itemsPerPage, filteredCampaignList.length)}
        {this.getModal(currentCampaignList, isEdit, onClickSubmitEdit, onClickCancelEdit)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  campaignList: state.campaign.campaignList,
  isEdit: state.campaign.isEdit,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchData: () => dispatch(actionCreaters.fetchData()),
  onDeleteData: (id) => dispatch(actionCreaters.deleteData(id)),
  onClickEditData: (id) => dispatch(actionCreaters.editClicked(id)),
  onClickSubmitEdit: (updatedList) => dispatch(actionCreaters.submitEdit(updatedList)),
  onClickCancelEdit: () => dispatch(actionCreaters.cancelEdit()),
  onChangeCheckbox: (id, isChecked) => dispatch(actionCreaters.changeCheckboxStatus(id, isChecked)),
  onClickMultipleEdit: () => dispatch(actionCreaters.editMultipleClicked()),
});

CampaignList.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  onFetchData: PropTypes.func.isRequired,
  onDeleteData: PropTypes.func.isRequired,
  onClickEditData: PropTypes.func.isRequired,
  onClickSubmitEdit: PropTypes.func.isRequired,
  onClickCancelEdit: PropTypes.func.isRequired,
  onClickMultipleEdit: PropTypes.func.isRequired,
  onChangeCheckbox: PropTypes.func.isRequired,
};

CampaignList.defaultProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignList);
