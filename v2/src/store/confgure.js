import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import penderMiddleware from 'redux-pender';
import logger from 'redux-logger';
import * as modules from './modules';

const reducers = combineReducers(modules);

const middlewares = [logger, penderMiddleware()];
//const isDev = process.env.NODE_ENV === 'development';
//const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));
export default store;