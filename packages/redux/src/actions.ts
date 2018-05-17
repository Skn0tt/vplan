import { createAction } from "redux-actions";
import {
  Group,
  Class,
  AnyEntry,
  Teacher,
  Messages,
  AllDayInfo
} from "vplan-types";
import {
  AllEntriesRecord,
  PutEntriesPayload,
  MessagesRecord,
  PutMessagesPayload
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
export const fetchEntriesError = createAction<string>(FETCH_ENTRIES_ERROR);

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
export const fetchEntriesStudentError = createAction<string>(
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
export const fetchEntriesTeacherError = createAction<string>(
  FETCH_ENTRIES_TEACHER_ERROR
);

/**
 * ## PUT_ENTRIES
 */
export const PUT_ENTRIES = "PUT_ENTRIES";
export const PUT_ENTRIES_ERROR = "PUT_ENTRIES_ERROR";
export const PUT_ENTRIES_SUCCESS = "PUT_ENTRIES_SUCCESS";
export const putEntries = createAction<PutEntriesPayload>(PUT_ENTRIES);
export const putEntriesError = createAction<string>(PUT_ENTRIES_ERROR);
export const putEntriesSuccess = createAction(PUT_ENTRIES_SUCCESS);

/**
 * ## FETCH_MESSAGES
 */
export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const FETCH_MESSAGES_ERROR = "FETCH_MESSAGES_ERROR";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const fetchMessages = createAction(FETCH_MESSAGES);
export const fetchMessagesError = createAction<string>(FETCH_MESSAGES_ERROR);
export const fetchMessagesSuccess = createAction<Messages>(
  FETCH_MESSAGES_SUCCESS
);

/**
 * ## FETCH_MESSAGES_TEACHER
 */
export const FETCH_MESSAGES_TEACHER = "FETCH_MESSAGES_TEACHER";
export const FETCH_MESSAGES_TEACHER_ERROR = "FETCH_MESSAGES_TEACHER_ERROR";
export const FETCH_MESSAGES_TEACHER_SUCCESS = "FETCH_MESSAGES_TEACHER_SUCCESS";
export const fetchMessagesTeacher = createAction(FETCH_MESSAGES_TEACHER);
export const fetchMessagesTeacherError = createAction<string>(
  FETCH_MESSAGES_TEACHER_ERROR
);
export const fetchMessagesTeacherSuccess = createAction<string[]>(
  FETCH_MESSAGES_TEACHER_SUCCESS
);

/**
 * ## FETCH_REFRESH_TIME
 */
export const FETCH_REFRESH_TIME = "FETCH_REFRESH_TIME";
export const FETCH_REFRESH_TIME_ERROR = "FETCH_REFRESH_TIME_ERROR";
export const FETCH_REFRESH_TIME_SUCCESS = "FETCH_REFRESH_TIME_SUCCESS";
export const fetchRefreshTime = createAction(FETCH_REFRESH_TIME);
export const fetchRefreshTimeError = createAction<string>(
  FETCH_REFRESH_TIME_ERROR
);
export const fetchRefreshTimeSuccess = createAction<string[]>(
  FETCH_REFRESH_TIME_SUCCESS
);

/**
 * ## FETCH_MESSAGES_STUDENT
 */
export const FETCH_MESSAGES_STUDENT = "FETCH_MESSAGES_STUDENT";
export const FETCH_MESSAGES_STUDENT_ERROR = "FETCH_MESSAGES_STUDENT_ERROR";
export const FETCH_MESSAGES_STUDENT_SUCCESS = "FETCH_MESSAGES_STUDENT_SUCCESS";
export const fetchMessagesStudent = createAction(FETCH_MESSAGES_STUDENT);
export const fetchMessagesStudentError = createAction<string>(
  FETCH_MESSAGES_STUDENT_ERROR
);
export const fetchMessagesStudentSuccess = createAction<string[]>(
  FETCH_MESSAGES_STUDENT_SUCCESS
);

/**
 * ## FETCH_DAYINFO
 */
export const FETCH_DAYINFO = "FETCH_DAYINFO";
export const FETCH_DAYINFO_ERROR = "FETCH_DAYINFO_ERROR";
export const FETCH_DAYINFO_SUCCESS = "FETCH_DAYINFO_SUCCESS";
export const fetchDayInfo = createAction(FETCH_DAYINFO);
export const fetchDayInfoError = createAction<string>(FETCH_DAYINFO_ERROR);
export const fetchDayInfoSuccess = createAction<AllDayInfo>(
  FETCH_DAYINFO_SUCCESS
);

/**
 * ## PUT_MESSAGES
 */
export const PUT_MESSAGES = "PUT_MESSAGES";
export const PUT_MESSAGES_ERROR = "PUT_MESSAGES_ERROR";
export const PUT_MESSAGES_SUCCESS = "PUT_MESSAGES_SUCCESS";
export const putMessages = createAction<PutMessagesPayload>(PUT_MESSAGES);
export const putMessagesError = createAction<string>(PUT_MESSAGES_ERROR);
export const putMessagesSuccess = createAction<MessagesRecord>(
  PUT_MESSAGES_SUCCESS
);

/**
 * # Sync
 */

/**
 * ## REMOVE_ERROR
 */
export const REMOVE_ERROR = "REMOVE_ERROR";
export const removeError = createAction<number>(REMOVE_ERROR);

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
export const addMarked = createAction<AnyEntry>(ADD_MARKED);

/**
 * ## REMOVE_MARKED
 */
export const REMOVE_MARKED = "REMOVE_MARKED";
export const removeMarked = createAction<AnyEntry>(REMOVE_MARKED);

/**
 * ## SET_GROUP
 */
export const SET_GROUP = "SET_GROUP";
export const setGroup = createAction<Group>(SET_GROUP);
