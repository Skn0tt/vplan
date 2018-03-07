import { createAction } from "redux-actions";
import { Entries, Class } from "vplan-types";

export const FETCH_ENTRIES = "FETCH_ENTRIES";
export const FETCH_ENTRIES_ERROR = "FETCH_ENTRIES_ERROR";
export const FETCH_ENTRIES_SUCCESS = "FETCH_ENTRIES_SUCCESS";
export const fetchEntries = createAction(FETCH_ENTRIES);
export const fetchEntriesSuccess = createAction<Entries>(FETCH_ENTRIES_SUCCESS);
export const fetchEntriesError = createAction<Error>(FETCH_ENTRIES_ERROR);

export const SET_CLASS = "SET_CLASS";
export const setClass = createAction<Class>(SET_CLASS);

export const FETCH_TEACHERS = "FETCH_TEACHERS";
export const FETCH_TEACHERS_ERROR = "FETCH_TEACHERS_ERROR";
export const FETCH_TEACHERS_SUCCESS = "FETCH_TEACHERS_SUCCESS";
export const fetchTeachers = createAction(FETCH_TEACHERS);
export const fetchTeachersError = createAction(FETCH_TEACHERS_ERROR);
export const fetchTeachersSuccess = createAction(FETCH_TEACHERS_SUCCESS);
