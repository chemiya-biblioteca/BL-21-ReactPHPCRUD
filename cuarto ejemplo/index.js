
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bulma/css/bulma.css";
import "./style.css";
import {
  HashRouter as Router,
} from "react-router-dom";
ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);


reportWebVitals();
