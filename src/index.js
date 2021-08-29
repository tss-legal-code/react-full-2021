import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { checkOrInit_DB } from './ioLocalStorage';

checkOrInit_DB()

ReactDOM.render(
    <App />,
  document.getElementById('root')
);