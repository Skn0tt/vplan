import { Entry, Group } from "vplan-types";

type Extractor<A, B> = (input: Readonly<A>) => Readonly<B>;
type Validator<A> = (input: Readonly<A>) => boolean;

export const validClass = (entry: Entry) => entry.class !== "---";

const isNumber = (s: string): boolean => !isNaN(+s);

export const getMark: Extractor<Entry, String> = e => validClass(e) ? e.class : e.teacher;

export const isLower: Validator<Group> = g => isNumber(g.charAt(0));

export const hashEntry = (entry: Entry) =>
  entry.class + entry.day + entry.room + entry.from + entry.substituteTeacher;

export const compareEntries = (a: Entry, b: Entry): number =>
  a.day - b.day ||
  a.from - b.from ||
  a.class.localeCompare(b.class) ||
  a.teacher.localeCompare(b.teacher) ||
  a.substituteTeacher.localeCompare(b.substituteTeacher);
