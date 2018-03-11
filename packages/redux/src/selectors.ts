import { AllEntriesMap } from "./types";
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
import { createSelector } from "reselect";

type Selector<T> = (state: AllEntriesMap) => T;

export const getInfo: Selector<Informations> = state => state.get("info");

export const getEntries: Selector<AllEntries> = state => state.get("entries");

export const getStudentEntries = createSelector<
  AllEntriesMap,
  AllEntries,
  StudentEntries
>(getEntries, (entries: AllEntries) => entries.student);

export const getTeacherEntries = createSelector<
  AllEntriesMap,
  AllEntries,
  TeacherEntries
>(getEntries, (entries: AllEntries) => entries.teacher);

export const filterStudentEntries = (short: Group) =>
  createSelector<AllEntriesMap, StudentEntries, StudentEntry[]>(
    getStudentEntries,
    (entries: StudentEntries) => entries[short]
  );

export const filterTeacherEntries = (short: Teacher) =>
  createSelector<AllEntriesMap, TeacherEntries, StudentEntry[]>(
    getTeacherEntries,
    (entries: TeacherEntries) => entries[short]
  );

export const isMarked = (c: Class): Selector<boolean> => state =>
  state.get("marked").has(c);

export const getGroup: Selector<Group> = state => state.get("group");
export const isLoading: Selector<boolean> = state => state.get("loading") > 0;

export const getTeacherInfo = (short: string): Selector<TeacherInfo> => state =>
  state.getIn(["teachers", short]);
