import { isTeachersView } from "./cheerio";
import { DayInfo, AllDayInfo, Entries, Entry, Grouped } from "vplan-types";
import * as _ from "lodash";

export const toAllDayInfo = (...dayInfos: DayInfo[]): AllDayInfo =>
  _.fromPairs(dayInfos.map(i => [new Date(i.day).toISOString(), i]));

export const sortStudentTeacher = (...files: string[]) => {
  const teacherFiles: string[] = [];
  const studentFiles: string[] = [];
  files.forEach(
    f => (isTeachersView(f) ? teacherFiles.push(f) : studentFiles.push(f))
  );

  return { studentFiles, teacherFiles };
};

export const merge = (...groups: Entries[]) =>
  _.merge(_.head(groups), ..._.tail(groups));

export type GroupEntries = (...entries: Entry[]) => Entries;

export const groupTeachers: GroupEntries = (...entries) =>
  _.groupBy(entries, "substituteTeacher");

export const groupStudents: GroupEntries = (...entries) =>
  _.groupBy(entries, "group");
