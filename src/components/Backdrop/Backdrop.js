import React from 'react';
import PropTypes from 'prop-types';
import './Backdrop.css';

const Backdrop = ({ clicked }) => <div className="Backdrop" onClick={clicked} />;

Backdrop.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default Backdrop;
