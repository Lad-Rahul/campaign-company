import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Searchbar.css';
import { defaultMemoize } from 'reselect';

class Searchbar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      timeout: 0,
    };
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    const { query } = this.state;
    const { search } = this.props;
    return search(query);
  };

  onChangeSearch = (event) => {
    this.setState({ query: event.target.value });
  };

  getSearchbar = defaultMemoize((query) => (
    <form className="Searchbar" onSubmit={this.onFormSubmit}>
      <input type="text" className="InputSearch" placeholder="Search..." value={query} onChange={this.onChangeSearch} />
      <input type="submit" value="Search" className="ButtonSearch" />
    </form>
  ));

  render() {
    const { query } = this.state;
    return this.getSearchbar(query);
  }
}

Searchbar.propTypes = {
  search: PropTypes.func.isRequired,
};

export default Searchbar;
