import { Entry } from "vplan-types";

export const text = (entry: Readonly<Entry>): string =>
  entry.class ? entry.class + " " + entry.teacher : entry.teacher;

export const secondaryText = (entry: Readonly<Entry>): string => {
  let result: string = entry.type;
  if (entry.substituteTeacher) {
    result += ", ";
    result += entry.substituteTeacher;

    if (entry.room) {
      result += "@";
      result += entry.room;
    }
  }

  return result;
};
