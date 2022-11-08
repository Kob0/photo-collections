import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      previousLabel="<"
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
