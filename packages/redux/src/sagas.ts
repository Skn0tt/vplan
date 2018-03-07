import { takeEvery } from "redux-saga";
import { put, call } from "redux-saga/effects";
import * as api from "./api";
import {
  fetchEntriesError,
  fetchEntriesSuccess,
  FETCH_ENTRIES
} from "./actions";

function* fetchEntriesSaga(action) {
  try {
    const result = yield call(api.fetchData);

    yield put(fetchEntriesSuccess(result));
  } catch (error) {
    yield put(fetchEntriesError(error));
  }
}

function* rootSaga() {
  yield takeEvery(FETCH_ENTRIES, fetchEntriesSaga);
}

export default rootSaga;
