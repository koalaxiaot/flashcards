import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(reducers, applyMiddleware(thunk));
console.log('init: ', store.getState());

export default store;
