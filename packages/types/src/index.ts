export type Group =
  | "5A"
  | "5B"
  | "5C"
  | "5D"
  | "6A"
  | "6B"
  | "6C"
  | "6D"
  | "7A"
  | "7B"
  | "7C"
  | "7D"
  | "8A"
  | "8B"
  | "8C"
  | "8D"
  | "9A"
  | "9B"
  | "9C"
  | "9D"
  | "EF"
  | "Q1"
  | "Q2";

export enum Types {
  VERTRETUNG = "Vertr.",
  EVA = "EVA",
  ENTFALL = "Entfall",
  RAUM_VERTRETUNG = "Raum-Vtr.",
  BETREUUNG = "Betreuung",
  KLAUSUR = "Klausur"
}

export type Class = string;

//TODO: specify
export type Teacher = string;

export type TeacherInfo = {
  name: string;
  short: Teacher;
  subjects: ReadonlyArray<string>;
};

export type Short = Teacher | Group;

// TODO: Specify
export type Entry = {
  type: Types;
  from: number;
  to: number;
  day: Date;
  title: string;
  class: Class;
  teacher: Teacher;
  substituteTeacher: Teacher;
  room: string;
};
