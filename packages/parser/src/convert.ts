import {
  StudentEntry,
  TeacherEntry,
  Types,
  Group,
  Short,
  Grouped,
  AnyEntry
} from "vplan-types";
import * as _ from "lodash";

export type MapToEntry = (
  day: Date
) => (group: string) => (row: string[]) => AnyEntry;

export const toStudentEntry: MapToEntry = _ => group => row => {
  const { from, to } = getHours(row[2]);
  const substituteTeacher = sanitizeSubsituteTeacher(row[3].trim());
  const teacher = row[7].trim();
  const room = row[8].trim();
  const c = row[4].trim();
  const day = getDay(row[1]);

  return {
    from,
    to,
    group,
    substituteTeacher,
    teacher,
    room,
    day,
    class: c,
    type: row[0] as Types
  };
};

const getDay = (input: string): number => {
  const [day, month] = input.split(".");

  const result = new Date();

  result.setHours(0, 0, 0, 0);
  result.setDate(+day);
  result.setMonth(+month - 1);

  return +result;
};

export const toTeacherEntry: MapToEntry = day => _ => row => {
  const { from, to } = getHours(row[1]);
  const teacher = row[7].trim();
  const c = row[5].trim();
  const group = row[2].trim() as Group;
  const substituteClass = row[4].trim();
  const substituteTeacher = sanitizeSubsituteTeacher(row[3].trim());

  return {
    from,
    to,
    teacher,
    day: +day,
    class: c,
    group,
    substituteTeacher,
    substituteClass,
    type: row[0] as Types,
    room: row[6]
  };
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

  return { from: +from, to: +to };
};

const forbiddenChars = ["+"];

const isIncludedIn = (s: string) => (c: string) => s.indexOf(c) !== -1;

const sanitizeSubsituteTeacher = (input: string) =>
  forbiddenChars.some(isIncludedIn(input)) ? "" : input;
