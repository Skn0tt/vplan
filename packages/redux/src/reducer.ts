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
  FETCH_INFO_ERROR,
  FETCH_INFO_TEACHER,
  FETCH_INFO_TEACHER_ERROR,
  FETCH_INFO_SUCCESS,
  FETCH_INFO_STUDENT,
  FETCH_INFO_STUDENT_ERROR,
  FETCH_INFO_STUDENT_SUCCESS,
  FETCH_INFO_TEACHER_SUCCESS
} from "./actions";
import { Class, Group, Entry } from "vplan-types";
import { AppState, AllEntriesRecord, InfoRecord } from "./types";
import { Map, Set } from "immutable";
import { getGroup } from "./selectors";

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
        .update("entries", entries => entries.merge(action.payload!)),

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
        .update("entries", entries => entries.merge(action.payload!)),

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
        .update("entries", entries => entries.merge(action.payload!)),

    /**
     * ## PUT_ENTRIES
     */
    ...asyncReducerFull(PUT_ENTRIES, PUT_ENTRIES_ERROR, PUT_ENTRIES_SUCCESS),

    /**
     * ## FETCH_INFO
     */
    ...asyncReducer(FETCH_INFO, FETCH_INFO_ERROR),
    [FETCH_INFO_SUCCESS]: (state, action: Action<AllEntriesRecord>) =>
      state.update("loading", decrement).set("info", Map(action.payload!)),

    /**
     * ## FETCH_INFO_TEACHER
     */
    ...asyncReducer(FETCH_INFO_TEACHER, FETCH_INFO_TEACHER_ERROR),
    [FETCH_INFO_TEACHER_SUCCESS]: (state, action: Action<AllEntriesRecord>) =>
      state
        .update("loading", decrement)
        .setIn(["info", "teacher"], action.payload),

    /**
     * ## FETCH_INFO_STUDENT
     */
    ...asyncReducer(FETCH_INFO_STUDENT, FETCH_INFO_STUDENT_ERROR),
    [FETCH_INFO_STUDENT_SUCCESS]: (state, action) =>
      state
        .update("loading", decrement)
        .setIn(["info", "student"], action.payload),

    /**
     * ## PUT_INFO
     */
    ...asyncReducer(PUT_INFO, PUT_INFO_ERROR),
    [PUT_INFO_SUCCESS]: (state, action: Action<InfoRecord>) =>
      state.update("loading", decrement).set("info", action.payload),

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
      state.updateIn(
        ["marked", getGroup(state)],
        Set(),
        (marked: Set<string>) => marked.add(action.payload!)
      ),
    [REMOVE_MARKED]: (state, action: Action<Class>) =>
      state.updateIn(
        ["marked", getGroup(state)],
        Set(),
        (marked: Set<string>) => marked.delete(action.payload!)
      )
  } as ReducerMap<AppState, Object>,
  new AppState({}) // initial State
);

export default reducer;
