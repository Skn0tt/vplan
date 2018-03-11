import { createAction } from "redux-actions";
import { Group, Class, Entry, Teacher } from "vplan-types";
import { AllEntriesRecord } from "./types";

/**
 * # Async
 */

/**
 * ## FETCH_ENTRIES
 */
export const FETCH_ENTRIES = "FETCH_ENTRIES";
export const FETCH_ENTRIES_ERROR = "FETCH_ENTRIES_ERROR";
export const FETCH_ENTRIES_SUCCESS = "FETCH_ENTRIES_SUCCESS";
export const fetchEntries = createAction(FETCH_ENTRIES);
export const fetchEntriesSuccess = createAction<AllEntriesRecord>(
  FETCH_ENTRIES_SUCCESS
);
export const fetchEntriesError = createAction<Error>(FETCH_ENTRIES_ERROR);

/**
 * ## FETCH_ENTRIES_STUDENT
 */
export const FETCH_ENTRIES_STUDENT = "FETCH_ENTRIES_STUDENT";
export const FETCH_ENTRIES_STUDENT_ERROR = "FETCH_ENTRIES_STUDENT_ERROR";
export const FETCH_ENTRIES_STUDENT_SUCCESS = "FETCH_ENTRIES_STUDENT_SUCCESS";
export const fetchEntriesStudent = createAction(FETCH_ENTRIES_STUDENT);
export const fetchEntriesStudentSuccess = createAction<AllEntriesRecord>(
  FETCH_ENTRIES_STUDENT_SUCCESS
);
export const fetchEntriesStudentError = createAction<Error>(
  FETCH_ENTRIES_STUDENT_ERROR
);

/**
 * ## FETCH_ENTRIES_TEACHER
 */
export const FETCH_ENTRIES_TEACHER = "FETCH_ENTRIES_TEACHER";
export const FETCH_ENTRIES_TEACHER_ERROR = "FETCH_ENTRIES_TEACHER_ERROR";
export const FETCH_ENTRIES_TEACHER_SUCCESS = "FETCH_ENTRIES_TEACHER_SUCCESS";
export const fetchEntriesTeacher = createAction(FETCH_ENTRIES_TEACHER);
export const fetchEntriesTeacherSuccess = createAction<AllEntriesRecord>(
  FETCH_ENTRIES_TEACHER_SUCCESS
);
export const fetchEntriesTeacherError = createAction<Error>(
  FETCH_ENTRIES_TEACHER_ERROR
);

/**
 * ## FETCH_TEACHERS
 */
export const FETCH_TEACHERS = "FETCH_TEACHERS";
export const FETCH_TEACHERS_ERROR = "FETCH_TEACHERS_ERROR";
export const FETCH_TEACHERS_SUCCESS = "FETCH_TEACHERS_SUCCESS";
export const fetchTeachers = createAction(FETCH_TEACHERS);
export const fetchTeachersError = createAction<Error>(FETCH_TEACHERS_ERROR);
export const fetchTeachersSuccess = createAction<ReadonlyArray<Teacher>>(
  FETCH_TEACHERS_SUCCESS
);

/**
 * # Sync
 */

/**
 * ## ADD_MARKED
 */
export const ADD_MARKED = "ADD_MARKED";
export const addMarked = createAction<Class>(ADD_MARKED);

/**
 * ## REMOVE_MARKED
 */
export const REMOVE_MARKED = "REMOVE_MARKED";
export const removeMarked = createAction<Class>(REMOVE_MARKED);

/**
 * ## SET_GROUP
 */
export const SET_GROUP = "SET_GROUP";
export const setGroup = createAction<Group>(SET_GROUP);
