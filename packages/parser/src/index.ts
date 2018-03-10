import sample2 from "./sampleinputteacher2";
import parse from "./parse";
import { Entry, Grouped } from "vplan-types";
import group from "./group";
import { convertStudent, convertTeacher } from "./convert";
import merge from "./merge";

export type Row = string[];

type Converter = (input: Grouped<Row>) => Grouped<Entry>;

const todayDate = (): Date => new Date();
const day = 24 * 60 * 60 * 1000;
const tomorrowDate = (): Date => new Date(+todayDate() + day);

const parseHTML = (
  input: string,
  parser: (input: string) => Row[],
  converter: (groups: Grouped<Row>) => Grouped<Entry>
): Readonly<Grouped<Entry>> => {
  const rows = parser(input);
  const groups = group(rows);
  const groupedEntries = converter(groups);

  return groupedEntries;
};

/**
 * Parse Teacher
 */
const parseTeacherDay = (input: string, day: Date) =>
  parseHTML(input, parse(true), convertTeacher(day));
export const parseTeacherView = (today: string, tomorrow: string) =>
  merge(
    parseTeacherDay(today, todayDate()),
    parseTeacherDay(tomorrow, tomorrowDate())
  );

/**
 * Parse Students
 */
const parseStudentDay = (input: string) =>
  parseHTML(input, parse(false), convertStudent);
export const parseStudentView = (today: string, tomorrow: string) =>
  merge(parseStudentDay(today), parseStudentDay(tomorrow));
