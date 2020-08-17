import React, { PureComponent } from 'react';
import './Loader.css';

class Loader extends PureComponent {
    getLoader = () => <div className="loader">Loading...</div>

    render() {
      return this.getLoader();
    }
}

export default Loader;
