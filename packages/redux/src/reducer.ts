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
  PUT_ENTRIES_ERROR,
  PUT_ENTRIES_SUCCESS,
  SET_IS_TEACHER,
  SET_SHORT,
  FETCH_DAYINFO,
  FETCH_DAYINFO_ERROR,
  FETCH_DAYINFO_SUCCESS,
  REMOVE_ERROR,
  FETCH_REFRESH_TIME_ERROR,
  FETCH_REFRESH_TIME,
  FETCH_REFRESH_TIME_SUCCESS,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES,
  FETCH_MESSAGES_ERROR,
  FETCH_MESSAGES_TEACHER,
  FETCH_MESSAGES_TEACHER_ERROR,
  FETCH_MESSAGES_TEACHER_SUCCESS,
  FETCH_MESSAGES_STUDENT_SUCCESS,
  FETCH_MESSAGES_STUDENT,
  FETCH_MESSAGES_STUDENT_ERROR,
  PUT_MESSAGES,
  PUT_MESSAGES_ERROR,
  PUT_MESSAGES_SUCCESS
} from "./actions";
import { Class, Group, AnyEntry, AllDayInfo } from "vplan-types";
import { AppState, AllEntriesRecord, MessagesRecord } from "./types";
import { Map, Set, List } from "immutable";
import { getGroup } from "./selectors";
import { getMark } from "vplan-util";

/**
 * # Helper
 */
const increment = (i: number) => i + 1;
const decrement = (i: number) => i - 1;
const push = (item: any) => (list: List<any>) => list.push(item);
const remove = (ind: number) => (list: List<any>) => list.remove(ind);

const asyncReducer = (start: string, error: string) => ({
  [start]: (state: AppState) => state.update("loading", increment),
  [error]: (state: AppState, action: Action<string>) =>
    state.update("loading", decrement).update("errors", push(action.payload))
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
        .setIn(["entries", "student"], action.payload),

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
        .setIn(["entries", "teacher"], action.payload),

    /**
     * ## FETCH_DAYINFO
     */
    ...asyncReducer(FETCH_DAYINFO, FETCH_DAYINFO_ERROR),
    [FETCH_DAYINFO_SUCCESS]: (state, action: Action<AllDayInfo>) =>
      state.update("loading", decrement).set("dayInfo", action.payload),

    /**
     * ## FETCH_REFRESH_TIME
     */
    ...asyncReducer(FETCH_REFRESH_TIME, FETCH_REFRESH_TIME_ERROR),
    [FETCH_REFRESH_TIME_SUCCESS]: (state, action: Action<Date>) =>
      state.update("loading", decrement).set("refreshtime", action.payload),

    /**
     * ## PUT_ENTRIES
     */
    ...asyncReducerFull(PUT_ENTRIES, PUT_ENTRIES_ERROR, PUT_ENTRIES_SUCCESS),

    /**
     * ## FETCH_MESSAGES
     */
    ...asyncReducer(FETCH_MESSAGES, FETCH_MESSAGES_ERROR),
    [FETCH_MESSAGES_SUCCESS]: (state, action: Action<AllEntriesRecord>) =>
      state.update("loading", decrement).set("info", Map(action.payload!)),

    /**
     * ## FETCH_MESSAGES_TEACHER
     */
    ...asyncReducer(FETCH_MESSAGES_TEACHER, FETCH_MESSAGES_TEACHER_ERROR),
    [FETCH_MESSAGES_TEACHER_SUCCESS]: (
      state,
      action: Action<AllEntriesRecord>
    ) =>
      state
        .update("loading", decrement)
        .setIn(["info", "teacher"], action.payload),

    /**
     * ## FETCH_MESSAGES_STUDENT
     */
    ...asyncReducer(FETCH_MESSAGES_STUDENT, FETCH_MESSAGES_STUDENT_ERROR),
    [FETCH_MESSAGES_STUDENT_SUCCESS]: (state, action) =>
      state
        .update("loading", decrement)
        .setIn(["info", "student"], action.payload),

    /**
     * ## PUT_MESSAGES
     */
    ...asyncReducer(PUT_MESSAGES, PUT_MESSAGES_ERROR),
    [PUT_MESSAGES_SUCCESS]: (state, action: Action<MessagesRecord>) =>
      state.update("loading", decrement).set("info", action.payload),

    /**
     * # Sync
     */

    /**
     * ## REMOVE_ERROR
     */
    [REMOVE_ERROR]: (state, action: Action<number>) =>
      state.update("errors", remove(action.payload!)),

    /**
     * ## SET_IS_TEACHER
     */
    [SET_IS_TEACHER]: (state, action: Action<boolean>) =>
      state.set("isTeacher", action.payload),

    /**
     * ## SET_SHORT
     */
    [SET_SHORT]: (state, action: Action<string>) =>
      state.set("short", action.payload),

    /**
     * ## SET_GROUP
     */
    [SET_GROUP]: (state, action: Action<Group>) =>
      state.set("group", action.payload),

    /**
     * ## MARKED
     */
    [ADD_MARKED]: (state, action: Action<AnyEntry>) =>
      state.updateIn(
        ["marked", getGroup(state)],
        Set(),
        (marked: Set<string>) => marked.add(getMark(action.payload!))
      ),
    [REMOVE_MARKED]: (state, action: Action<AnyEntry>) =>
      state.updateIn(
        ["marked", getGroup(state)],
        Set(),
        (marked: Set<string>) => marked.delete(getMark(action.payload!))
      )
  } as ReducerMap<AppState, Object>,
  new AppState({}) // initial State
);

export default reducer;
