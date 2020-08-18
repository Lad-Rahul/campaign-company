/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import { defaultMemoize } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreaters from '../../store/actions';
import Campaign from './Campaign/Campaign';
import Searchbar from '../Searchbar/Searchbar';
import './CampaignList.css';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import Editbox from '../Editbox/Editbox';
import editImg from '../../assets/image/edit_image.png';
import * as Constants from '../../constants';

class CampaignList extends PureComponent {
  applyfilter = defaultMemoize((campaignList, searchQuery) => {
    if (!searchQuery) return campaignList;
    const newList = _filter(campaignList, (obj) => {
      const name = obj.name.toLowerCase();
      const type = obj.type.toLowerCase();
      const qry = searchQuery.toLowerCase();
      if (name.includes(qry)) return true;
      if (type.includes(qry)) return true;
      return false;
    });
    return newList;
  });

  showTotal = defaultMemoize((totalCampaigns) => <p className="Total">{Constants.TOTAL + totalCampaigns}</p>);

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
    this.setState({ searchQuery: query.trim(), currentPage: 1 });
  };

  getHeading = defaultMemoize((onClickMultipleEdit) => (
    <div className="ListHeading">
      <div className="HeadingItems">
        <span className="HeadingCheckbox">
          <img src={editImg} onClick={onClickMultipleEdit} className="EditImgMultiple" alt="EDIT Selected" />
        </span>
        <span className="HeadingName">{Constants.CAMPAIGN_NAME}</span>
        <span className="HeadingType">{Constants.TYPE}</span>
        <span className="HeadingTime">{Constants.LAST_SAVED}</span>
        <span className="HeadingAction">{Constants.ACTIONS}</span>
      </div>
    </div>
  ));

  getCampaignList = defaultMemoize(
    (currentCampaignList, onDeleteData, onClickEditData, onChangeCheckbox) => {
      if (!currentCampaignList || currentCampaignList.length === 0) {
        return (<p><strong>{Constants.NOT_FOUND}</strong></p>);
      }
      return (
        <ul className="ListItems">
          {
          _map(currentCampaignList, (obj) => (
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
    },
  );

  getPagination = defaultMemoize((currentPage, itemsPerPage, total) => (
    <Pagination
      itemsPerPage={itemsPerPage}
      totalItems={total}
      paginate={this.paginate}
      activePage={currentPage}
    />
  ));

  getModal = defaultMemoize((currentCampaignList, isEdit, onClickSubmitEdit, onClickCancelEdit) => (
    <Modal show={isEdit} close={onClickCancelEdit}>
      <Editbox
        editList={_filter(currentCampaignList, (obj) => (obj.isChecked === true))}
        submitEdit={onClickSubmitEdit}
        cancelEdit={onClickCancelEdit}
      />
    </Modal>
  ));

  paginate = (pageNo) => {
    this.setState({ currentPage: pageNo });
  }

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
        {this.showTotal(campaignList.length)}
        {this.getHeading(onClickMultipleEdit)}
        {this.getCampaignList(currentCampaignList, onDeleteData, onClickEditData, onChangeCheckbox)}
        {this.getPagination(currentPage, itemsPerPage, filteredCampaignList.length)}
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
  campaignList: PropTypes.array,
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
  campaignList: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignList);
