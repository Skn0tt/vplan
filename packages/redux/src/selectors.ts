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
  TeacherInfo,
  StudentEntries,
  StudentEntry,
  AllEntries,
  TeacherEntries,
  Informations
} from "vplan-types";
import { createSelector, Selector } from "reselect";

export const getInfo: Selector<AppState, Informations> = state =>
  state.get("info");

export const getEntries: Selector<AppState, AllEntriesRecord> = state =>
  state.get("entries");

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
  state.get("marked").has(c);

export const getGroup: Selector<AppState, Group> = state => state.get("group");
export const isLoading: Selector<AppState, boolean> = state =>
  state.get("loading") > 0;

export const getTeacherInfo = (
  short: string
): Selector<AppState, TeacherInfo> => state => state.getIn(["teachers", short]);
