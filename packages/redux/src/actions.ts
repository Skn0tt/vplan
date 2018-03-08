import { createAction } from "redux-actions";
import { Group, Class, Entry } from "vplan-types";

export const FETCH_ENTRIES = "FETCH_ENTRIES";
export const FETCH_ENTRIES_ERROR = "FETCH_ENTRIES_ERROR";
export const FETCH_ENTRIES_SUCCESS = "FETCH_ENTRIES_SUCCESS";
export const fetchEntries = createAction(FETCH_ENTRIES);
export const fetchEntriesSuccess = createAction<ReadonlyArray<Entry>>(
  FETCH_ENTRIES_SUCCESS
);
export const fetchEntriesError = createAction<Error>(FETCH_ENTRIES_ERROR);

export const SET_GROUP = "SET_GROUP";
export const setGroup = createAction<Group>(SET_GROUP);

export const FETCH_TEACHERS = "FETCH_TEACHERS";
export const FETCH_TEACHERS_ERROR = "FETCH_TEACHERS_ERROR";
export const FETCH_TEACHERS_SUCCESS = "FETCH_TEACHERS_SUCCESS";
export const fetchTeachers = createAction(FETCH_TEACHERS);
export const fetchTeachersError = createAction<Error>(FETCH_TEACHERS_ERROR);
export const fetchTeachersSuccess = createAction<ReadonlyArray<Entry>>(
  FETCH_TEACHERS_SUCCESS
);

export const ADD_MARKED = "ADD_MARKED";
export const REMOVE_MARKED = "REMOVE_MARKED";
export const addMarked = createAction<Class>(ADD_MARKED);
export const removeMarked = createAction<Class>(REMOVE_MARKED);
