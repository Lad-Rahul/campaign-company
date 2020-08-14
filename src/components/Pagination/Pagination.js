import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';
import PageNumber from './PageNumber/PageNumber';

class Pagination extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  setActivePageAndPaginate = (number) => {
    const { paginate } = this.props;
    this.setState({ activePage: number });
    return paginate(number);
  }

    getPagination = (itemsPerPage, totalItems, paginate, activePage) => {
      const pageNumbers = [];

      for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
        pageNumbers.push(i);
      }

      return (
        <ul className="Pagination">
          {
            pageNumbers.map(
              (pageNo) => (
                <PageNumber
                  key={pageNo}
                  pageNum={pageNo}
                  paginate={this.setActivePageAndPaginate}
                  currActive={activePage}
                />
              ),
            )
            }
        </ul>
      );
    }

    render() {
      const { activePage } = this.state;
      const { itemsPerPage, totalItems, paginate } = this.props;
      return this.getPagination(itemsPerPage, totalItems, paginate, activePage);
    }
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;
