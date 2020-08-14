import React, { PureComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Home from './components/Home/Home';

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter basename="/">
        <div className="App">
          <Home />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
