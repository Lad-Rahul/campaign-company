/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends PureComponent {
  getBackgrop = (close) => <Backdrop clicked={close} />;

  getChildren = (children, show) => {
    let modalClasses = 'Modal ModalHide';
    if (show) {
      modalClasses = 'Modal ModalShow';
    }
    return <div className={modalClasses}>{children}</div>;
  }

  render() {
    const { show, close, children } = this.props;

    return show ? (
      <div>
        {this.getBackgrop(close)}
        {this.getChildren(children, show)}
      </div>
    ) : null;
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default Modal;
