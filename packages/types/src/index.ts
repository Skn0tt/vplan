export type Class = string;
export type Group = string;
export type Teacher = string;

export type Short = Teacher | Group;

export type BaseEntry = {
  group: Group;
  type: string;
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

export type Grouped<T> = { [type: string]: T[] };

export type StudentEntries = Grouped<StudentEntry>;
export type TeacherEntries = Grouped<TeacherEntry>;

export type Entries = StudentEntries | TeacherEntries;

export type AllEntries = {
  student: StudentEntries;
  teacher: TeacherEntries;
};

export type DayInfo = {
  day: number;
  week: "A" | "B";
  missingTeachers: Short[];
  missingGroups: Group[];
  blockedRooms: string[];
};

export type AllDayInfo = { [date: string]: DayInfo };

export type Info = {
  student: string[];
  teacher: string[];
};
