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
  putMessagesSuccess,
  putMessagesError,
  putEntriesSuccess,
  putEntriesError,
  PUT_ENTRIES,
  FETCH_DAYINFO,
  fetchDayInfoSuccess,
  fetchDayInfoError,
  fetchRefreshTime,
  fetchRefreshTimeSuccess,
  fetchRefreshTimeError,
  FETCH_REFRESH_TIME,
  fetchMessagesStudentSuccess,
  fetchMessagesStudentError,
  fetchMessagesTeacherSuccess,
  fetchMessagesTeacherError,
  fetchMessagesSuccess,
  fetchMessagesError,
  FETCH_MESSAGES,
  FETCH_MESSAGES_TEACHER,
  FETCH_MESSAGES_STUDENT,
  PUT_MESSAGES
} from "./actions";
import { Action, ActionFunction1 } from "redux-actions";
import { Map } from "immutable";
import { PutEntriesPayload, PutMessagesPayload, AppState } from "./types";
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

const fetchMessagesSaga = createSaga(
  api.fetchMessages,
  fetchMessagesSuccess,
  fetchMessagesError
);

const fetchMessagesTeacherSaga = createSaga(
  api.fetchMessagesTeacher,
  fetchMessagesTeacherSuccess,
  fetchMessagesTeacherError
);

const fetchMessagesStudentSaga = createSaga(
  api.fetchMessagesStudent,
  fetchMessagesStudentSuccess,
  fetchMessagesStudentError
);

const fetchRefreshtimeSaga = createSaga(
  api.fetchRefreshtime,
  fetchRefreshTimeSuccess,
  fetchRefreshTimeError
);

const putMessagesSaga = createSaga(
  api.putMessages,
  putMessagesSuccess,
  putMessagesError
);

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
  yield takeLatest(FETCH_MESSAGES, fetchMessagesSaga);
  yield takeLatest(FETCH_MESSAGES_TEACHER, fetchMessagesTeacherSaga);
  yield takeLatest(FETCH_MESSAGES_STUDENT, fetchMessagesStudentSaga);
  yield takeLatest(FETCH_REFRESH_TIME, fetchRefreshtimeSaga);
  yield takeLatest(FETCH_DAYINFO, fetchDayInfoSaga);

  /**
   * # Take all
   * > Write Operation
   */
  yield takeEvery(PUT_MESSAGES, putMessagesSaga);
  yield takeEvery(PUT_ENTRIES, putEntriesSaga);
}

export default rootSaga;
