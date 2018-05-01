import {
  parseDayInfo,
  parseTable,
  isTeachersView,
  parseDate,
  parseExportDate
} from "./parse";
import { Entry, Grouped, DayInfo, AllDayInfo, AllEntries } from "vplan-types";
import group from "./group";
import { convertStudent, convertTeacher } from "./convert";
import merge from "./merge";
import encoding from "./encoding";
import * as _ from "lodash";

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
const parseTeacherDay = (input: string) =>
  parseHTML(input, parseTable(true), convertTeacher(parseDate(input)));

/**
 * Parse Students
 */
const parseStudentDay = (input: string) =>
  parseHTML(input, parseTable(false), convertStudent);

export type ParseResult = { entries: AllEntries; info: AllDayInfo; date: Date };
export const parseFiles = (buffers: Buffer[]): ParseResult => {
  const files = buffers.map(encoding);
  const teacherViews: string[] = [];
  const studentViews: string[] = [];

  files.forEach(
    f => (isTeachersView(f) ? teacherViews.push(f) : studentViews.push(f))
  );
  const studentEntries = merge(...studentViews.map(parseStudentDay));
  const teacherEntries = merge(...teacherViews.map(parseTeacherDay));

  const dayInfos = teacherViews.map(parseDayInfo);
  const info: AllDayInfo = _.fromPairs(
    dayInfos.map(i => [new Date(i.day).toISOString(), i])
  );
  const date = Math.max(...files.map(parseExportDate).map(v => +v));

  return {
    info,
    entries: {
      student: studentEntries,
      teacher: teacherEntries
    },
    date: new Date(date)
  };
};
