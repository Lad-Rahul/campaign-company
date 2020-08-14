import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './PageNumber.css';

class PageNumber extends PureComponent {
    onClickPageNumber = () => {
      const { pageNum, paginate } = this.props;
      return paginate(pageNum);
    }

    render() {
      const { pageNum, currActive } = this.props;
      let pageClass = 'PageNo';
      if (pageNum === currActive) pageClass = 'PageNo ActiveNo';
      return (
        <li key={pageNum} className={pageClass} onClick={this.onClickPageNumber}>
          {pageNum}
        </li>
      );
    }
}

PageNumber.propTypes = {
  pageNum: PropTypes.number.isRequired,
  currActive: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default PageNumber;
