import React from 'react';

import './Loader.css';

const Loader = () => {
  return (
    <div class="spinner-border text-primary loader" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  )
}

export default Loader;