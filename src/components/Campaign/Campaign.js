/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Campaign.css';
import { editImg } from '../../assets/image/edit_image.png';
import { deleteImg } from '../../assets/image/delete_image.png';

class Campaign extends PureComponent {
    onClickDelete = () => {
      const { campaignObj: { id }, remove } = this.props;
      return remove(id);
    }

    onClickEdit = () => {
      const { campaignObj: { id }, edit } = this.props;
      return edit(id);
    }

    onClickCheckbox = (event) => {
      const { campaignObj: { id }, change } = this.props;
      // console.log(event.target.checked);
      return change(id, event.target.checked);
    }

  getListItem = (id, name, type, lastSaved, isChecked) => (
    <li className="CampaignItem" key={id}>
      <span className="LiCheckbox"><input type="checkbox" onChange={this.onClickCheckbox} checked={isChecked} /></span>
      <span className="LiName">{name}</span>
      <span className="LiType">{type}</span>
      <span className="LiTime">{lastSaved}</span>
      <span className="LiAction">
        <img className="LiImg" src={editImg} alt="Edit" onClick={this.onClickEdit} />
        <img className="LiImg" src={deleteImg} alt="Delete" onClick={this.onClickDelete} />
      </span>
    </li>
  )

  render() {
    const {
      campaignObj: {
        id, name, type, lastSaved, isChecked,
      },
    } = this.props;
    return this.getListItem(id, name, type, lastSaved, isChecked);
  }
}

Campaign.propTypes = {
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};

export default Campaign;
