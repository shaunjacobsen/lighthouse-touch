import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import App from './App';
import Home from './containers/Home';
import Transit from './containers/Transit';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
render(
  <App>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transit" element={<Transit />} />
      </Routes>
    </BrowserRouter>
  </App>,
  rootElement,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
