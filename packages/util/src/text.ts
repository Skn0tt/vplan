import { Entry } from "vplan-types";
import { isLower } from "./entries";

export const text = (entry: Readonly<Entry>): string =>
  entry.class ? entry.class + " " + entry.teacher : entry.teacher;

export const textWithClass = (entry: Readonly<Entry>): string =>
  isLower(entry.group) ? `${entry.group} ${text(entry)}` : text(entry);

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
