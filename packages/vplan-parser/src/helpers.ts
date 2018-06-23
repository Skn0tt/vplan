import { isTeachersView } from "./cheerio";
import {
  DayInfo,
  AllDayInfo,
  Entries,
  AnyEntry,
  Grouped,
  StudentEntries,
  TeacherEntries
} from "vplan-types";
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

export const merge = <T extends { [key: string]: any[] }>(
  ...groups: T[]
): T => {
  const result = {} as any;
  groups.forEach(group => {
    _.forEach(group, (val, key) => {
      result[key] = (result[key] || []).concat(val);
    });
  });

  return result;
};

export type GroupEntries = (...entries: AnyEntry[]) => Entries;

export const groupTeachers: GroupEntries = (...entries) =>
  _.groupBy(entries, "substituteTeacher");

export const groupStudents: GroupEntries = (...entries) =>
  _.groupBy(entries, "group");
