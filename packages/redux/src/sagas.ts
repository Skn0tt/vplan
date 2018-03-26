import { put, call, takeEvery, select } from "redux-saga/effects";
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
  FETCH_ENTRIES_TEACHER,
  fetchInfoSuccess,
  fetchInfoError,
  putInfoSuccess,
  putInfoError,
  putEntriesSuccess,
  putEntriesError,
  PUT_INFO,
  PUT_ENTRIES,
  FETCH_INFO,
  FETCH_INFO_TEACHER,
  FETCH_INFO_STUDENT,
  fetchInfoStudentError,
  fetchInfoStudentSuccess,
  fetchInfoTeacherError,
  fetchInfoTeacherSuccess,
  FETCH_DAYINFO,
  fetchDayInfoSuccess,
  fetchDayInfoError
} from "./actions";
import { Action } from "redux-actions";
import { Map } from "immutable";
import { PutEntriesPayload, PutInfoPayload, AppState } from "./types";
import { config, getOwnEntries, isMarked } from "./";
import diff from "./diff";
import { Entries, StudentEntries, Entry } from "vplan-types";

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
    const oldEntries: Entry[] = yield select(getOwnEntries);

    const result = yield call(api.fetchEntriesStudent);

    yield put(fetchEntriesStudentSuccess(result));

    if (!!config.onNewEntriesReceived) {
      const newEntries: Entry[] = yield select(getOwnEntries);
      const state: AppState = yield select(v => v);

      const diffEntries = diff(oldEntries, newEntries);

      const markedNewEntries = diffEntries.filter(v =>
        isMarked(v.class)(state)
      );

      config.onNewEntriesReceived(markedNewEntries);
    }
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

function* putEntriesSaga(action: Action<PutEntriesPayload>) {
  try {
    yield call(api.putEntries, action.payload);

    yield put(putEntriesSuccess());
  } catch (error) {
    yield put(putEntriesError(error));
  }
}

function* fetchInfoSaga(action: Action<void>) {
  try {
    const result = yield call(api.fetchInfo);

    yield put(fetchInfoSuccess(result));
  } catch (error) {
    yield put(fetchInfoError(error));
  }
}

function* fetchInfoTeacherSaga(action: Action<void>) {
  try {
    const result = yield call(api.fetchInfoTeacher);

    yield put(fetchInfoTeacherSuccess(result));
  } catch (error) {
    yield put(fetchInfoTeacherError(error));
  }
}

function* fetchInfoStudentSaga(action: Action<void>) {
  try {
    const result = yield call(api.fetchInfoStudent);

    yield put(fetchInfoStudentSuccess(result));
  } catch (error) {
    yield put(fetchInfoStudentError(error));
  }
}

function* putInfoSaga(action: Action<PutInfoPayload>) {
  try {
    const info = yield call(api.putInfo, action.payload);

    yield put(putInfoSuccess(info));
  } catch (error) {
    yield put(putInfoError(error));
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

function* fetchDayInfoSaga(action: Action<void>) {
  try {
    const result = yield call(api.fetchDayInfo);

    yield put(fetchDayInfoSuccess(result));
  } catch (error) {
    yield put(fetchDayInfoError(error));
  }
}

function* rootSaga() {
  yield takeEvery(FETCH_ENTRIES, fetchEntriesSaga);
  yield takeEvery(FETCH_TEACHERS, fetchTeachersSaga);
  yield takeEvery(FETCH_ENTRIES_STUDENT, fetchEntriesStudentSaga);
  yield takeEvery(FETCH_ENTRIES_TEACHER, fetchEntriesTeacherSaga);
  yield takeEvery(FETCH_INFO, fetchInfoSaga);
  yield takeEvery(FETCH_INFO_TEACHER, fetchInfoTeacherSaga);
  yield takeEvery(FETCH_INFO_STUDENT, fetchInfoStudentSaga);
  yield takeEvery(FETCH_DAYINFO, fetchDayInfoSaga);
  yield takeEvery(PUT_INFO, putInfoSaga);
  yield takeEvery(PUT_ENTRIES, putEntriesSaga);
}

export default rootSaga;
