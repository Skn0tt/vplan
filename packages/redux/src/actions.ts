import { createAction } from "redux-actions";
import { Entries } from "vplan-types";

export const FETCH_ENTRIES = "FETCH_ENTRIES";
export const FETCH_ENTRIES_ERROR = "FETCH_ENTRIES_ERROR";
export const FETCH_ENTRIES_SUCCESS = "FETCH_ENTRIES_SUCCESS";

export const fetchEntries = createAction<void>(FETCH_ENTRIES);
export const fetchEntriesSuccess = createAction<Entries>(FETCH_ENTRIES_SUCCESS);
export const fetchEntriesError = createAction<Error>(FETCH_ENTRIES_ERROR);
