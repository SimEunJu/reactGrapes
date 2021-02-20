import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import grape, {grapeSaga} from "./modules/grape";
import loading from "./modules/loading";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        grape,
        loading
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([logger, sagaMiddleware]),
});

export function* rootSaga(){
    //yield all[grapsSaga()];
}
sagaMiddleware.run(rootSaga);

export default store;