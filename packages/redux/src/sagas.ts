import { takeEvery } from "redux-saga";
import { put, call } from "redux-saga/effects";
import * as api from "./api";
import {
  fetchEntriesError,
  fetchEntriesSuccess,
  FETCH_ENTRIES,
  FETCH_TEACHERS
} from "./actions";

function* fetchEntriesSaga(action) {
  try {
    const result = yield call(api.fetchEntries);

    yield put(fetchEntriesSuccess(result));
  } catch (error) {
    yield put(fetchEntriesError(error));
  }
}

function* fetchTeachersSaga(action) {
  try {
    const result = yield call(api.fetchTeachers);

    yield put(fetchEntriesSuccess(result));
  } catch (error) {
    yield put(fetchEntriesError(error));
  }
}

function* rootSaga() {
  yield takeEvery(FETCH_ENTRIES, fetchEntriesSaga);
  yield takeEvery(FETCH_TEACHERS, fetchTeachersSaga);
}

export default rootSaga;
