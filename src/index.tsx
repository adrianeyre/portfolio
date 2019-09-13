import '@babel/polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('root') as HTMLElement
);
