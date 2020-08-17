import React, { PureComponent } from 'react';
import { defaultMemoize } from 'reselect';
import PropTypes from 'prop-types';
import './Pagination.css';
import PageNumber from './PageNumber/PageNumber';

class Pagination extends PureComponent {

  setActivePageAndPaginate = (pageNumber) => {
    const { paginate, itemsPerPage } = this.props;
    return paginate(pageNumber, itemsPerPage);
  }

    getPagination = defaultMemoize((itemsPerPage, totalItems, activePage) => {
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
    });

    render() {
      const { activePage } = this.props;
      const { itemsPerPage, totalItems } = this.props;
      return this.getPagination(itemsPerPage, totalItems, activePage);
    }
}

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;
