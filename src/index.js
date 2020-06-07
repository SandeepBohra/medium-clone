import React from 'react';

import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import { createBrowserHistory } from 'history';

import 'bootstrap/dist/css/bootstrap.css';

import App from './App';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);
