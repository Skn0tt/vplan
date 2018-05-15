import {
  AppState,
  AllEntriesRecord,
  StudentEntriesMap,
  TeacherEntriesMap,
  InfoRecord
} from "./types";
import {
  Group,
  Teacher,
  Class,
  StudentEntries,
  StudentEntry,
  AllEntries,
  TeacherEntries,
  Info,
  AnyEntry,
  AllDayInfo,
  Short
} from "vplan-types";
import { createSelector, Selector } from "reselect";
import { getMark } from "vplan-util";

const getState: Selector<AppState, AppState> = state => state;

export const getInfo: Selector<AppState, Info> = state =>
  state.get("info").toJS();

export const getInfos: Selector<AppState, string[]> = state =>
  state
    .get("info")
    .flatten()
    .toArray();

export const getInfoTeacher: Selector<AppState, string[]> = state =>
  state.getIn(["info", "teacher"]);

export const getInfoStudent: Selector<AppState, string[]> = state =>
  state.getIn(["info", "student"]);

export const getOwnInfos: Selector<AppState, string[]> = state =>
  isTeacher(state)
    ? getInfoTeacher(state).concat(getInfoStudent(state))
    : getInfoStudent(state);

export const getEntries: Selector<AppState, AllEntriesRecord> = state =>
  state.get("entries");

export const isTeacher: Selector<AppState, boolean> = state =>
  state.get("isTeacher");

export const getRefreshtime: Selector<AppState, Date> = state =>
  state.get("refreshtime");

export const getShort = createSelector<AppState, AppState, boolean, Short>(
  [getState, isTeacher],
  (state, isTeacher) => (isTeacher ? state.get("short") : state.get("group"))
);

export const getOwnEntries = createSelector<
  AppState,
  boolean,
  string,
  AllEntriesRecord,
  AnyEntry[]
>([isTeacher, getShort, getEntries], (isTeacher, id, entries) =>
  entries.getIn([isTeacher ? "teacher" : "student", id])
);

export const getDayInfo: Selector<AppState, AllDayInfo> = state =>
  state.get("dayInfo").toJS();

export const getStudentEntries = createSelector<
  AppState,
  AllEntriesRecord,
  StudentEntriesMap
>([getEntries], (entries: AllEntriesRecord) => entries.get("student"));

export const getTeacherEntries = createSelector<
  AppState,
  AllEntriesRecord,
  TeacherEntriesMap
>([getEntries], (entries: AllEntriesRecord) => entries.get("teacher"));

export const filterStudentEntries = (short: Group) =>
  createSelector<AppState, StudentEntriesMap, StudentEntry[]>(
    getStudentEntries,
    entries => entries.get(short)
  );

export const filterTeacherEntries = (short: Teacher) =>
  createSelector<AppState, TeacherEntriesMap, StudentEntry[]>(
    getTeacherEntries,
    entries => entries.get(short)
  );

export const isMarked = (e: AnyEntry): Selector<AppState, boolean> => state =>
  state.hasIn(["marked", getGroup(state), getMark(e)]);

export const getGroup: Selector<AppState, Group> = state => state.get("group");
export const isLoading: Selector<AppState, boolean> = state =>
  state.get("loading") > 0;

export const getErrors: Selector<AppState, string[]> = state =>
  state.get("errors").toArray();
