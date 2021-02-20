import {createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer, {rootSaga} from './modules';

const reducers = combineReducers(rootReducer);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware];
const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

export default store;