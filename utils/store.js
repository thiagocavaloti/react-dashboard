/* eslint-disable no-underscore-dangle */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const enhancers = compose(
  typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'
    ? window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f,
);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default initialState => createStoreWithMiddleware(reducers, initialState, enhancers);
