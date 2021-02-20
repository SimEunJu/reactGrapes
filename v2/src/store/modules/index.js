import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import grape, {grapeSaga} from "../modules/grape";
import loading from "../modules/loading";

const rootReducer = combineReducers({
    grape,
    loading
});

export function* rootSaga(){
    yield all[grapsSaga()];
}

export default rootReducer;