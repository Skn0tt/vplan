import { handleActions, ReducerMap, Action } from "redux-actions";
import { AppState } from "./types";
import {
  FETCH_ENTRIES,
  FETCH_ENTRIES_ERROR,
  FETCH_ENTRIES_SUCCESS,
  ADD_MARKED,
  REMOVE_MARKED,
  SET_GROUP
} from "./actions";
import { Class, Group, Entry } from "vplan-types";

const increment = (i: number) => i + 1;
const decrement = (i: number) => i - 1;

const reducer = handleActions(
  {
    /**
     * FETCH_ENTRIES
     */
    [FETCH_ENTRIES]: (state, action) => state.update("loading", increment),
    [FETCH_ENTRIES_ERROR]: (state, action) =>
      state.update("loading", decrement),
    [FETCH_ENTRIES_SUCCESS]: (state, action: Action<Entry>) =>
      state.update("loading", decrement).set("entries", action.payload),

    /**
     * SET_GROUP
     */
    [SET_GROUP]: (state, action: Action<Group>) =>
      state.set("group", action.payload),

    /**
     * MARKED
     */
    [ADD_MARKED]: (state, action: Action<Class>) =>
      state.update("marked", marked => marked.add(action.payload)),
    [REMOVE_MARKED]: (state, action: Action<Class>) =>
      state.update("marked", marked => marked.delete(action.payload))
  } as ReducerMap<AppState, Object>,
  new AppState({}) // initial State
);

export default reducer;
