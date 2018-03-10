import sampleinput from "./sampleinput";
import sampleinputteacher from "./sampleinputteacher";
import sampleinput2 from "./sampleinput2";
import sampleinputteacher2 from "./sampleinputteacher2";
import parse from "./parse";
import { Entry } from "vplan-types";
import group from "./group";
import { convertStudent, convertTeacher } from "./convert";

export type Row = string[];
export type Grouped<T> = { [type: string]: T[] };

type Converter = (input: Grouped<Row>) => Grouped<Entry>;

export const today = (): Date => new Date();

const day = 24 * 60 * 60 * 1000;
export const tomorrow = (): Date => new Date(+today() + day);

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

export const parseTeacher = (input: string, day: Date) =>
  parseHTML(input, parse(true), convertTeacher(day));

export const parseStudent = (input: string) =>
  parseHTML(input, parse(false), convertStudent);

console.log(parseTeacher(sampleinputteacher, tomorrow()));
