import { put, call, takeEvery, select, takeLatest } from "redux-saga/effects";
import * as api from "./api";
import {
  fetchEntriesError,
  fetchEntriesSuccess,
  FETCH_ENTRIES,
  fetchEntriesStudentSuccess,
  fetchEntriesTeacherSuccess,
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
  fetchDayInfoError,
  fetchRefreshTime,
  fetchRefreshTimeSuccess,
  fetchRefreshTimeError,
  FETCH_REFRESH_TIME
} from "./actions";
import { Action, ActionFunction1 } from "redux-actions";
import { Map } from "immutable";
import { PutEntriesPayload, PutInfoPayload, AppState } from "./types";
import { config, getOwnEntries, isMarked, isTeacher } from "./";
import diff from "./diff";
import { Entries, StudentEntries, AnyEntry } from "vplan-types";
import { Function0, Function1, Function2 } from "lodash";
import store from "./store";

/**
 * # Saga Creators
 */

const createSaga = (
  api: Function0<void> | Function1<any, void>,
  onSuccess: ActionFunction1<any, Action<any>>,
  onError: ActionFunction1<string, Action<string>>
) =>
  function*(action: Action<any>) {
    try {
      const result = yield call(api, action.payload);

      yield put(onSuccess(result));
    } catch (e) {
      const error: Error = e;
      yield put(onError(error.message));
    }
  };

const createSagaWithComparison = (
  api: Function0<void> | Function1<any, void>,
  onSuccess: ActionFunction1<any, Action<any>>,
  onError: ActionFunction1<string, Action<string>>,
  onCompare: Function2<AnyEntry[], AnyEntry[], void>
) =>
  function*(action: Action<any>) {
    try {
      const oldEntries: AnyEntry[] = yield select(getOwnEntries);

      const result = yield call(api, action.payload);

      yield put(onSuccess(result));

      const newEntries: AnyEntry[] = yield select(getOwnEntries);
      onCompare(oldEntries, newEntries);
    } catch (e) {
      const error: Error = e;
      yield put(onError(error.message));
    }
  };

/**
 * ## Comparison
 */
const comparer = (oldEntries: AnyEntry[], newEntries: AnyEntry[]) => {
  if (!config.onNewEntriesReceived) {
    return;
  }

  const state = store.getState() as AppState;

  const diffEntries = diff(oldEntries, newEntries);

  const markedNewEntries = isTeacher(state)
    ? diffEntries
    : diffEntries.filter(e => isMarked(e)(state));

  config.onNewEntriesReceived(markedNewEntries);
};

/**
 * # Sagas
 */
const fetchEntriesSaga = createSagaWithComparison(
  api.fetchEntries,
  fetchEntriesSuccess,
  fetchEntriesError,
  comparer
);

const fetchEntriesStudentSaga = createSagaWithComparison(
  api.fetchEntriesStudent,
  fetchEntriesStudentSuccess,
  fetchEntriesStudentError,
  comparer
);

const fetchEntriesTeacherSaga = createSagaWithComparison(
  api.fetchEntriesTeacher,
  fetchEntriesTeacherSuccess,
  fetchEntriesTeacherError,
  comparer
);

function* putEntriesSaga(action: Action<any>) {
  try {
    const result = yield call(api.putEntries, action.payload);

    yield put(putEntriesSuccess());
    yield put(fetchRefreshTime());
  } catch (e) {
    const error: Error = e;
    yield put(putEntriesError(error.message));
  }
}

const fetchInfoSaga = createSaga(
  api.fetchInfo,
  fetchInfoSuccess,
  fetchInfoError
);

const fetchInfoTeacherSaga = createSaga(
  api.fetchInfoTeacher,
  fetchInfoTeacherSuccess,
  fetchInfoTeacherError
);

const fetchInfoStudentSaga = createSaga(
  api.fetchInfoStudent,
  fetchInfoStudentSuccess,
  fetchInfoStudentError
);

const fetchRefreshtimeSaga = createSaga(
  api.fetchRefreshtime,
  fetchRefreshTimeSuccess,
  fetchRefreshTimeError
);

const putInfoSaga = createSaga(api.putInfo, putInfoSuccess, putInfoError);

const fetchDayInfoSaga = createSaga(
  api.fetchDayInfo,
  fetchDayInfoSuccess,
  fetchDayInfoError
);

function* rootSaga() {
  /**
   * # Take one
   * > Read Operation
   */
  yield takeLatest(FETCH_ENTRIES, fetchEntriesSaga);
  yield takeLatest(FETCH_ENTRIES_STUDENT, fetchEntriesStudentSaga);
  yield takeLatest(FETCH_ENTRIES_TEACHER, fetchEntriesTeacherSaga);
  yield takeLatest(FETCH_INFO, fetchInfoSaga);
  yield takeLatest(FETCH_INFO_TEACHER, fetchInfoTeacherSaga);
  yield takeLatest(FETCH_INFO_STUDENT, fetchInfoStudentSaga);
  yield takeLatest(FETCH_REFRESH_TIME, fetchRefreshtimeSaga);
  yield takeLatest(FETCH_DAYINFO, fetchDayInfoSaga);

  /**
   * # Take all
   * > Write Operation
   */
  yield takeEvery(PUT_INFO, putInfoSaga);
  yield takeEvery(PUT_ENTRIES, putEntriesSaga);
}

export default rootSaga;
