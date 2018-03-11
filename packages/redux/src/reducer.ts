import { handleActions, ReducerMap, Action } from "redux-actions";
import {
  FETCH_ENTRIES,
  FETCH_ENTRIES_ERROR,
  FETCH_ENTRIES_SUCCESS,
  ADD_MARKED,
  REMOVE_MARKED,
  SET_GROUP,
  FETCH_ENTRIES_STUDENT,
  FETCH_ENTRIES_STUDENT_ERROR,
  FETCH_ENTRIES_STUDENT_SUCCESS,
  FETCH_ENTRIES_TEACHER,
  FETCH_ENTRIES_TEACHER_ERROR,
  FETCH_ENTRIES_TEACHER_SUCCESS,
  PUT_ENTRIES,
  PUT_INFO_ERROR,
  PUT_INFO_SUCCESS,
  PUT_ENTRIES_ERROR,
  PUT_ENTRIES_SUCCESS,
  PUT_INFO,
  FETCH_INFO,
  FETCH_INFO_ERROR
} from "./actions";
import { Class, Group, Entry } from "vplan-types";
import { AppState, AllEntriesRecord } from "./types";

/**
 * # Helper
 */
const increment = (i: number) => i + 1;
const decrement = (i: number) => i - 1;

const asyncReducer = (start: string, error: string) => ({
  [start]: (state: AppState) => state.update("loading", increment),
  [error]: (state: AppState) => state.update("loading", decrement)
});

const asyncReducerFull = (start: string, error: string, success: string) => ({
  ...asyncReducer(start, error),
  [success]: (state: AppState) => state.update("loading", decrement)
});

/**
 * # Reducer
 */
const reducer = handleActions(
  {
    /**
     * # Async
     */

    /**
     * ## FETCH_ENTRIES
     */
    ...asyncReducer(FETCH_ENTRIES, FETCH_ENTRIES_ERROR),
    [FETCH_ENTRIES_SUCCESS]: (state, action: Action<AllEntriesRecord>) =>
      state
        .update("loading", decrement)
        .update("entries", entries => entries.merge(action.payload)),

    /**
     * ## FETCH_ENTRIES_STUDENT
     */
    ...asyncReducer(FETCH_ENTRIES_STUDENT, FETCH_ENTRIES_STUDENT_ERROR),
    [FETCH_ENTRIES_STUDENT_SUCCESS]: (
      state,
      action: Action<AllEntriesRecord>
    ) =>
      state
        .update("loading", decrement)
        .update("entries", entries => entries.merge(action.payload)),

    /**
     * ## FETCH_ENTRIES_TEACHER
     */
    ...asyncReducer(FETCH_ENTRIES_TEACHER, FETCH_ENTRIES_TEACHER_ERROR),
    [FETCH_ENTRIES_TEACHER_SUCCESS]: (
      state,
      action: Action<AllEntriesRecord>
    ) =>
      state
        .update("loading", decrement)
        .update("entries", entries => entries.merge(action.payload)),

    /**
     * ## PUT_ENTRIES
     */
    ...asyncReducerFull(PUT_ENTRIES, PUT_ENTRIES_ERROR, PUT_ENTRIES_SUCCESS),

    /**
     * ## FETCH_INFO
     */
    ...asyncReducer(FETCH_INFO, FETCH_INFO_ERROR),
    [FETCH_ENTRIES_TEACHER_SUCCESS]: (
      state,
      action: Action<AllEntriesRecord>
    ) =>
      state
        .update("loading", decrement)
        .update("entries", entries => entries.merge(action.payload)),

    /**
     * ## PUT_INFO
     */
    ...asyncReducerFull(PUT_INFO, PUT_INFO_ERROR, PUT_INFO_SUCCESS),

    /**
     * # Sync
     */

    /**
     * ## SET_GROUP
     */
    [SET_GROUP]: (state, action: Action<Group>) =>
      state.set("group", action.payload),
    /**
     * ## MARKED
     */
    [ADD_MARKED]: (state, action: Action<Class>) =>
      state.update("marked", marked => marked.add(action.payload)),
    [REMOVE_MARKED]: (state, action: Action<Class>) =>
      state.update("marked", marked => marked.delete(action.payload))
  } as ReducerMap<AppState, Object>,
  new AppState({}) // initial State
);

export default reducer;
