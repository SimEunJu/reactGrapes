import { call, put } from "redux-saga/effects";
import { createAction } from "redux-actions";
import { startLoading, finishLoading } from "../store/modules/loading";

export default function createRequestSaga(type, request) {
	const SUCCESS = `${type}Success`;
	const FAILURE = `${type}Failure`;

	const generatorFunc = function*(action) {
		yield put(startLoading(type));
		try {
			const response = yield call(request, action.payload);
			yield put({
				type: SUCCESS,
				payload: response.data,
			});
		} catch (e) {
			yield put({
				type: FAILURE,
				payload: e,
				error: true,
			});
		}
		yield put(finishLoading(type));
	};

	const actionFunc = createAction(type);

	return [actionFunc, generatorFunc];
}
