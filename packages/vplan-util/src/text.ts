import { AnyEntry } from "vplan-types";
import { isLower } from "./entries";

export const text = (entry: Readonly<AnyEntry>): string =>
  entry.class ? entry.class + " " + entry.teacher : entry.teacher;

export const textWithLowerClass = (entry: Readonly<AnyEntry>): string =>
  isLower(entry.group) ? `${entry.group} ${text(entry)}` : text(entry);

export const textWithClass = (entry: Readonly<AnyEntry>): string =>
  `${entry.group} ${text(entry)}`;

export const secondaryText = (entry: Readonly<AnyEntry>): string => {
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
