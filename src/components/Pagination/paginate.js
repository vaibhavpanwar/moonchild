import React from 'react';

const Paginate = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const prevHandler = () => {
    if (currentPage <= 1) {
      setCurrentPage(pageNumbers?.length);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextHandler = () => {
    if (currentPage === pageNumbers?.length) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="custom-pagination">
      <button className="pagination-button" onClick={prevHandler}>
        Previous
      </button>

      <div className="pagination-items">
        {pageNumbers.map((number) => (
          <span
            onClick={() => paginate(number)}
            key={number}
            className={`${number === currentPage ? 'active' : ''} `}>
            {number}
          </span>
        ))}
      </div>
      <button className="pagination-button" onClick={nextHandler}>
        Next
      </button>
    </div>
  );
};

export default Paginate;
