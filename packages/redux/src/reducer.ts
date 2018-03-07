import { handleActions, ReducerMap } from "redux-actions";
import { AppState } from "./types";
import {
  FETCH_ENTRIES,
  FETCH_ENTRIES_ERROR,
  FETCH_ENTRIES_SUCCESS,
  SET_CLASS
} from "./actions";

const increment = i => i + 1;
const decrement = i => i - 1;

const reducer = handleActions(
  {
    /**
     * FETCH_ENTRIES
     */
    [FETCH_ENTRIES]: (state, action) => state.update("loading", increment),
    [FETCH_ENTRIES_ERROR]: (state, action) =>
      state.update("loading", decrement),
    [FETCH_ENTRIES_SUCCESS]: (state, action) =>
      state.update("loading", decrement).set("entries", action.payload),

    /**
     * SET_CLASS
     */
    [SET_CLASS]: (state, action) => state.set("class", action.payload)
  } as ReducerMap<AppState, any>,
  new AppState({}) // initial State
);

export default reducer;
