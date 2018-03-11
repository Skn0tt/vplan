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
  FETCH_ENTRIES_TEACHER_SUCCESS
} from "./actions";
import { Class, Group, Entry } from "vplan-types";
import { AppState, AllEntriesRecord } from "./types";

const increment = (i: number) => i + 1;
const decrement = (i: number) => i - 1;

const reducer = handleActions(
  {
    /**
     * # Async
     */

    /**
     * ## FETCH_ENTRIES
     */
    [FETCH_ENTRIES]: (state, action) => state.update("loading", increment),
    [FETCH_ENTRIES_ERROR]: (state, action) =>
      state.update("loading", decrement),
    [FETCH_ENTRIES_SUCCESS]: (state, action: Action<AllEntriesRecord>) =>
      state
        .update("loading", decrement)
        .update("entries", entries => entries.merge(action.payload)),

    /**
     * ## FETCH_ENTRIES_STUDENT
     */
    [FETCH_ENTRIES_STUDENT]: (state, action) =>
      state.update("loading", increment),
    [FETCH_ENTRIES_STUDENT_ERROR]: (state, action) =>
      state.update("loading", decrement),
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
    [FETCH_ENTRIES_TEACHER]: (state, action) =>
      state.update("loading", increment),
    [FETCH_ENTRIES_TEACHER_ERROR]: (state, action) =>
      state.update("loading", decrement),
    [FETCH_ENTRIES_TEACHER_SUCCESS]: (
      state,
      action: Action<AllEntriesRecord>
    ) =>
      state
        .update("loading", decrement)
        .update("entries", entries => entries.merge(action.payload)),

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
