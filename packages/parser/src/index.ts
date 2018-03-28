import sample2 from "./sampleinputteacher2";
import { parseDayInfo, parseTable } from "./parse";
import { Entry, Grouped, DayInfo } from "vplan-types";
import group from "./group";
import { convertStudent, convertTeacher } from "./convert";
import merge from "./merge";
import encoding from "./encoding";
import sampleinput from "./sampleinput";

export type Row = string[];

type Converter = (input: Grouped<Row>) => Grouped<Entry>;

const todayDate = (): Date => new Date();
const day = 24 * 60 * 60 * 1000;
const tomorrowDate = (): Date => new Date(+todayDate() + day);

const parseHTML = (
  input: Buffer,
  parser: (input: string) => Row[],
  converter: (groups: Grouped<Row>) => Grouped<Entry>
): Readonly<Grouped<Entry>> => {
  const utf8 = encoding(input);
  const rows = parser(utf8);
  const groups = group(rows);
  const groupedEntries = converter(groups);

  return groupedEntries;
};

/**
 * Parse Teacher
 */
const parseTeacherDay = (input: Buffer, day: Date) =>
  parseHTML(input, parseTable(true), convertTeacher(day));
export const parseTeacherView = (today: Buffer, tomorrow: Buffer) =>
  merge(
    parseTeacherDay(today, todayDate()),
    parseTeacherDay(tomorrow, tomorrowDate())
  );

/**
 * Parse Students
 */
const parseStudentDay = (input: Buffer) =>
  parseHTML(input, parseTable(false), convertStudent);
export const parseStudentView = (today: Buffer, tomorrow: Buffer) =>
  merge(parseStudentDay(today), parseStudentDay(tomorrow));

/**
 * Parse Missing Teachers
 */
const parseDay = (input: Buffer): DayInfo => parseDayInfo(encoding(input));
export const parseDayInfoBoth = (today: Buffer, tomorrow: Buffer) => ({
  today: parseDay(today),
  tomorrow: parseDay(tomorrow)
});
