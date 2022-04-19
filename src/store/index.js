import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import lightingReducer from './lighting/reducer';
import weatherReducer from './weather/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      lighting: lightingReducer,
      weather: weatherReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
  );

  return store;
};
