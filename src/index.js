import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.scss';
import App from './App';
import Home from './containers/Home';
import Transit from './containers/Transit';
import Lighting from './containers/Lighting';
import reportWebVitals from './reportWebVitals';
import configureStore from './store/index';

const store = configureStore();

const rootElement = document.getElementById('root');
render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transit" element={<Transit />} />
          <Route path="/lighting" element={<Lighting />} />
        </Routes>
      </App>
    </BrowserRouter>
  </Provider>,
  rootElement,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
