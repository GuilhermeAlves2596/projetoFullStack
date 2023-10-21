// src/components/Pagination.js
import React from 'react';

const Pagination = ({ onPageChange }) => {
  const renderPageButtons = () => {
    const pageButtons = [];

    for (let i = 1; i <= 20; i++) {
      pageButtons.push(
        <button key={i} onClick={() => onPageChange(i)}>
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="pagination">
      {renderPageButtons()}
    </div>
  );
};

export default Pagination;
