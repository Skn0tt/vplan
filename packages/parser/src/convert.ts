import { Row } from "vplan-parser";
import {
  StudentEntry,
  TeacherEntry,
  Types,
  Group,
  Short,
  Grouped,
  Entry
} from "vplan-types";
import _ = require("lodash");

const getDate = (input: string): number => {
  const [day, month] = input.split(".");

  const result = new Date();
  result.setHours(0, 0, 0, 0);
  result.setDate(Number(day));
  result.setMonth(Number(month));
  return +result;
};

const getHours = (input: string) => {
  const from = input.charAt(0);
  let to = from;

  if (input.includes("/")) {
    to = input.charAt(2);
  }
  if (input.includes("-")) {
    to = input.charAt(4);
  }

  return { from: Number(from), to: Number(to) };
};

const mapTeacher = (day: Date) => (row: string[]): TeacherEntry => {
  const { from, to } = getHours(row[1]);
  return {
    from,
    to,
    day: +day,
    type: row[0] as Types,
    class: row[5],
    substituteClass: row[4],
    group: row[2] as Group,
    teacher: row[7],
    room: row[6],
    substituteTeacher: row[3]
  };
};

const mapStudent = (row: string[]): StudentEntry => {
  const { from, to } = getHours(row[2]);
  return {
    from,
    to,
    type: row[0] as Types,
    class: row[4],
    day: getDate(row[1]),
    teacher: row[7],
    room: row[8],
    substituteTeacher: row[3]
  };
};

const convert = (
  input: Grouped<Row>,
  map: (row: Row) => Entry
): Grouped<Entry> => _.mapValues(input, (v, k, o) => v.map(map));

const isLength = (length: number, value: string) => value.length === length;
const isUpperCase = (value: string) => value.toUpperCase() === value;
const validShort = (val: string): boolean =>
  isLength(3, val) && isUpperCase(val);
const nonTeacher: string[] = [];
const isTeacher = (val: string): boolean =>
  !_.includes(nonTeacher, val) && validShort(val);

const findShort = (entries: Entry[]): Short => {
  const entryWithShort = entries.find(entry =>
    isTeacher(entry.substituteTeacher)
  );
  return !!entryWithShort
    ? entryWithShort.substituteTeacher
    : entries[0].substituteTeacher;
};

const transformTeacherKeys = (
  input: Readonly<Grouped<Entry>>
): Readonly<Grouped<Entry>> =>
  _.mapKeys(input, (value, key) => findShort(value));

export const convertStudent = (
  input: Readonly<Grouped<Row>>
): Readonly<Grouped<Entry>> => convert(input, mapStudent);

export const convertTeacher = (day: Date) => (
  input: Readonly<Grouped<Row>>
): Readonly<Grouped<Entry>> =>
  transformTeacherKeys(convert(input, mapTeacher(day)));
