import { Entry } from "vplan-types";

export const validClass = (entry: Entry) => entry.class !== "---";

export const compareEntries = (a: Entry, b: Entry): number =>
  a.day - b.day ||
  a.from - b.from ||
  a.class.localeCompare(b.class) ||
  a.teacher.localeCompare(b.teacher) ||
  a.substituteTeacher.localeCompare(b.substituteTeacher);
