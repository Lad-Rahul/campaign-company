import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './InputEditbox.css';
import { defaultMemoize } from 'reselect';

class InputEditbox extends PureComponent {
  onChangeName = (event) => {
    const { id, change } = this.props;
    return change(event, id, 'name');
  };

  onChangeType = (event) => {
    const { id, change } = this.props;
    return change(event, id, 'type');
  };

  getInputbox = defaultMemoize((nameInput, typeInput) => (
    <div>
      <input
        className="InputEditbox"
        type="text"
        value={nameInput}
        onChange={this.onChangeName}
      />
      <input
        className="InputEditbox"
        type="text"
        value={typeInput}
        onChange={this.onChangeType}
      />
    </div>
  ));

  render() {
    const { nameInput, typeInput } = this.props;
    return this.getInputbox(nameInput, typeInput);
  }
}

InputEditbox.propTypes = {
  nameInput: PropTypes.string.isRequired,
  typeInput: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};

export default InputEditbox;
