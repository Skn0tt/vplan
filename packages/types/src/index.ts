/**
 * Vertretungsstunden
 */

export const Groups = [
  "5A",
  "5B",
  "5C",
  "5D",
  "6A",
  "6B",
  "6C",
  "6D",
  "7A",
  "7B",
  "7C",
  "7D",
  "8A",
  "8B",
  "8C",
  "8D",
  "9A",
  "9B",
  "9C",
  "9D",
  "EF",
  "Q1",
  "Q2"
];

export enum Types {
  VERTRETUNG = "Vertr.",
  EVA = "EVA",
  ENTFALL = "Entfall",
  RAUM_VERTRETUNG = "Raum-Vtr.",
  BETREUUNG = "Betreuung",
  KLAUSUR = "Klausur"
}

export type Class = string;

export type Group = string;

export type Teacher = string;

export type Short = Teacher | Group;

export type BaseEntry = {
  group: Group;
  type: Types;
  from: number;
  to: number;
  day: number;
  class: Class;
  teacher: Teacher;
  substituteTeacher: Teacher;
  room: string;
};

export type TeacherEntry = BaseEntry & {
  substituteClass: Class;
};

export type StudentEntry = BaseEntry;

export type AnyEntry = StudentEntry | TeacherEntry;

export type StudentEntries = Grouped<StudentEntry>;
export type TeacherEntries = Grouped<TeacherEntry>;
export type Entries = StudentEntries | TeacherEntries;
export type AllEntries = {
  student: StudentEntries;
  teacher: TeacherEntries;
};
export type Grouped<T> = { [type: string]: T[] };

export type DayInfo = {
  day: number;
  week: "A" | "B";
  missingTeachers: Short[];
  missingGroups: Group[];
  blockedRooms: string[];
};

export type AllDayInfo = { [date: string]: DayInfo };

/**
 * Informationen
 */
export type Info = {
  student: string[];
  teacher: string[];
};
