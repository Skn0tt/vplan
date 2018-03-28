import {
  AppState,
  AllEntriesRecord,
  StudentEntriesMap,
  TeacherEntriesMap
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
  Entry,
  AllDayInfo
} from "vplan-types";
import { createSelector, Selector } from "reselect";

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

export const getEntries: Selector<AppState, AllEntriesRecord> = state =>
  state.get("entries");

export const isTeacher: Selector<AppState, boolean> = state =>
  state.get("isTeacher");

export const getIdentifier = createSelector<
  AppState,
  AppState,
  boolean,
  string
>(
  [getState, isTeacher],
  (state, isTeacher) => (isTeacher ? state.get("short") : state.get("group"))
);

export const getOwnEntries = createSelector<
  AppState,
  boolean,
  string,
  AllEntriesRecord,
  Entry[]
>([isTeacher, getIdentifier, getEntries], (isTeacher, id, entries) =>
  entries.getIn([isTeacher ? "teacher" : "student", id])
);

export const getDayInfo: Selector<AppState, AllDayInfo> = state =>
  state.get("dayInfo");

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

export const isMarked = (c: Class): Selector<AppState, boolean> => state =>
  state.hasIn(["marked", getGroup(state), c]);

export const getGroup: Selector<AppState, Group> = state => state.get("group");
export const isLoading: Selector<AppState, boolean> = state =>
  state.get("loading") > 0;

export const getErrors: Selector<AppState, Error[]> = state =>
  state.get("errors").toArray();
