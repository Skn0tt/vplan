import { createAction } from "redux-actions";
import { Group, Class, Entry, Teacher, Info, AllDayInfo } from "vplan-types";
import {
  AllEntriesRecord,
  PutEntriesPayload,
  PutInfoPayload,
  InfoRecord
} from "./types";

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
 * ## PUT_ENTRIES
 */
export const PUT_ENTRIES = "PUT_ENTRIES";
export const PUT_ENTRIES_ERROR = "PUT_ENTRIES_ERROR";
export const PUT_ENTRIES_SUCCESS = "PUT_ENTRIES_SUCCESS";
export const putEntries = createAction<PutEntriesPayload>(PUT_ENTRIES);
export const putEntriesError = createAction<Error>(PUT_ENTRIES_ERROR);
export const putEntriesSuccess = createAction(PUT_ENTRIES_SUCCESS);

/**
 * ## FETCH_INFO
 */
export const FETCH_INFO = "FETCH_INFO";
export const FETCH_INFO_ERROR = "FETCH_INFO_ERROR";
export const FETCH_INFO_SUCCESS = "FETCH_INFO_SUCCESS";
export const fetchInfo = createAction(FETCH_INFO);
export const fetchInfoError = createAction<Error>(FETCH_INFO_ERROR);
export const fetchInfoSuccess = createAction<Info>(FETCH_INFO_SUCCESS);

/**
 * ## FETCH_INFO_TEACHER
 */
export const FETCH_INFO_TEACHER = "FETCH_INFO_TEACHER";
export const FETCH_INFO_TEACHER_ERROR = "FETCH_INFO_TEACHER_ERROR";
export const FETCH_INFO_TEACHER_SUCCESS = "FETCH_INFO_TEACHER_SUCCESS";
export const fetchInfoTeacher = createAction(FETCH_INFO_TEACHER);
export const fetchInfoTeacherError = createAction<Error>(
  FETCH_INFO_TEACHER_ERROR
);
export const fetchInfoTeacherSuccess = createAction<string[]>(
  FETCH_INFO_TEACHER_SUCCESS
);

/**
 * ## FETCH_INFO_STUDENT
 */
export const FETCH_INFO_STUDENT = "FETCH_INFO_STUDENT";
export const FETCH_INFO_STUDENT_ERROR = "FETCH_INFO_STUDENT_ERROR";
export const FETCH_INFO_STUDENT_SUCCESS = "FETCH_INFO_STUDENT_SUCCESS";
export const fetchInfoStudent = createAction(FETCH_INFO_STUDENT);
export const fetchInfoStudentError = createAction<Error>(
  FETCH_INFO_STUDENT_ERROR
);
export const fetchInfoStudentSuccess = createAction<string[]>(
  FETCH_INFO_STUDENT_SUCCESS
);

/**
 * ## FETCH_DAYINFO
 */
export const FETCH_DAYINFO = "FETCH_DAYINFO";
export const FETCH_DAYINFO_ERROR = "FETCH_DAYINFO_ERROR";
export const FETCH_DAYINFO_SUCCESS = "FETCH_DAYINFO_SUCCESS";
export const fetchDayInfo = createAction(FETCH_DAYINFO);
export const fetchDayInfoError = createAction<Error>(FETCH_DAYINFO_ERROR);
export const fetchDayInfoSuccess = createAction<AllDayInfo>(
  FETCH_DAYINFO_SUCCESS
);

/**
 * ## PUT_INFO
 */
export const PUT_INFO = "PUT_INFO";
export const PUT_INFO_ERROR = "PUT_INFO_ERROR";
export const PUT_INFO_SUCCESS = "PUT_INFO_SUCCESS";
export const putInfo = createAction<PutInfoPayload>(PUT_INFO);
export const putInfoError = createAction<Error>(PUT_INFO_ERROR);
export const putInfoSuccess = createAction<InfoRecord>(PUT_INFO_SUCCESS);

/**
 * # Sync
 */

/**
 * ## SET_IS_TEACHER
 */
export const SET_IS_TEACHER = "SET_IS_TEACHER";
export const setIsTeacher = createAction<boolean>(SET_IS_TEACHER);

/**
 * ## SET_SHORT
 */
export const SET_SHORT = "SET_SHORT";
export const setShort = createAction<string>(SET_SHORT);

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
