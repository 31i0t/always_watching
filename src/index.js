import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { v4 as uuid_v4 } from 'uuid'

ReactDOM.render(
  <React.StrictMode>
    <App key={uuid_v4()}/>
  </React.StrictMode>,
  document.getElementById('root')
)