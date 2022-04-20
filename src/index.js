import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.scss';
import Master from './containers/screens/Master';
import Mini from './containers/screens/Mini';
import Home from './containers/Home';
import Transit from './containers/Transit';
import Lighting from './containers/Lighting';
import reportWebVitals from './reportWebVitals';
import configureStore from './store/index';
import RoomHome from './containers/RoomHome';

const store = configureStore();

const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/master" element={<Master />}>
          <Route path="/master" element={<Home />} />
          <Route path="/master/transit" element={<Transit />} />
          <Route path="/master/lighting" element={<Lighting />} />
        </Route>
        <Route path="/bedroom" element={<Mini roomName="Bedroom" />}>
          <Route path="/bedroom" element={<RoomHome roomName="Bedroom" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  rootElement,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
