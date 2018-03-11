import { put, call, takeEvery } from "redux-saga/effects";
import * as api from "./api";
import {
  fetchEntriesError,
  fetchEntriesSuccess,
  FETCH_ENTRIES,
  FETCH_TEACHERS,
  fetchEntriesStudentSuccess,
  fetchEntriesTeacherSuccess,
  fetchTeachersSuccess,
  fetchTeachersError,
  fetchEntriesTeacherError,
  fetchEntriesStudentError,
  FETCH_ENTRIES_STUDENT,
  FETCH_ENTRIES_TEACHER
} from "./actions";
import { Action } from "redux-actions";
import { Map } from "immutable";

function* fetchEntriesSaga(action: Action<void>) {
  try {
    const result = yield call(api.fetchEntries);

    yield put(fetchEntriesSuccess(result));
  } catch (error) {
    yield put(fetchEntriesError(error));
  }
}

function* fetchEntriesStudentSaga(action: Action<void>) {
  try {
    const result = yield call(api.fetchEntriesStudent);

    yield put(fetchEntriesStudentSuccess(result));
  } catch (error) {
    yield put(fetchEntriesStudentError(error));
  }
}

function* fetchEntriesTeacherSaga(action: Action<void>) {
  try {
    const result = yield call(api.fetchEntriesTeacher);

    yield put(fetchEntriesTeacherSuccess(result));
  } catch (error) {
    yield put(fetchEntriesTeacherError(error));
  }
}

function* fetchTeachersSaga(action: Action<void>) {
  try {
    const result = yield call(api.fetchTeachers);

    yield put(fetchTeachersSuccess(result));
  } catch (error) {
    yield put(fetchTeachersError(error));
  }
}

function* rootSaga() {
  yield takeEvery(FETCH_ENTRIES, fetchEntriesSaga);
  yield takeEvery(FETCH_TEACHERS, fetchTeachersSaga);
  yield takeEvery(FETCH_ENTRIES_STUDENT, fetchEntriesStudentSaga);
  yield takeEvery(FETCH_ENTRIES_TEACHER, fetchEntriesTeacherSaga);
}

export default rootSaga;
