import React from 'react';

import './Loader.css';

const Loader = () => {
  return (
    <div className="spinner-border text-primary loader" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Loader;