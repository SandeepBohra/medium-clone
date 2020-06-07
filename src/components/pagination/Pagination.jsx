import React from 'react';

import './Pagination.css';

const Pagination = ({ activePage, itemsPerPage, totalPageCount, setActivePage }) => {

  const renderBlocks = () => {
    const pages = []; 
    for(let i=1; i <= Math.ceil(totalPageCount/itemsPerPage); i++) {
      pages.push(
        <li key={i} className={`page-item ${activePage === i ? 'active' : ''}`} onClick={() => setActivePage(i)}>
          <button className="btn page-btn page-link">
            {i}
          </button>
        </li>
      )}
    return pages;
  }

  return (
    <nav>
      {Math.ceil(totalPageCount/itemsPerPage) <= 1 ? null : (
        <ul className="pagination pagination-md flex-wrap">
        {renderBlocks()}
      </ul>
      )}
      
    </nav>
    
  )
}

export default Pagination;