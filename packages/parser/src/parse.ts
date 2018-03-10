import sampleinput from "./sampleinput";
import {
  Entry,
  Short,
  Types,
  StudentEntry,
  TeacherEntry,
  Group
} from "vplan-types";
import * as _ from "lodash";
import { Row } from "vplan-parser";

const find = (text: string, input: string) => input.indexOf(text);
const findLast = (text: string, input: string) => input.lastIndexOf(text);

const getBetweenFirstAndLast = (delimiter: string, input: string) =>
  input.substring(find(delimiter, input), findLast(delimiter, input));

const getBetween = (begin: string, end: string, input: string) =>
  input.substring(find(begin, input), find(end, input));

const getBetweenTags = (tag: string, input: string) =>
  getBetween(`<${tag}`, `</${tag}`, input);

const getCenter = (input: string) => getBetweenTags("center", input);
const getTable = (input: string) => getBetweenTags("table", input);
const getTableTeacher = (input: string) =>
  getTable(getBetweenFirstAndLast("<p>", input));

const lines = (input: string) => input.split("\n");
const getTableRows = (input: string) => lines(input).slice(1);
const removeTableHead = (rows: string[]) => rows.slice(2);
const removeLast = (nmb: number, rows: string[]) => rows.slice(0, -nmb);
const removeOuterTag = (row: string) =>
  row.slice(find(">", row) + 1, findLast("<", row));
const removeFirstTag = (row: string) => row.slice(find(">", row) + 1);

const getDataFields = (row: string) =>
  row
    .split("</td>")
    .map(removeFirstTag)
    .map(item => (hasOuterTag(item) ? removeOuterTag(item) : item));

const hasOuterTag = (row: string) => row.startsWith("<") && row.endsWith(">");

const invalid = ["&nbsp;", "+"];

const isValid = (item: string) => invalid.indexOf(item) === -1;

const sanitizeInvalid = (item: string) => (isValid(item) ? item : "");

export default (isTeachersView: boolean) => (input: string): Row[] => {
  const center = getCenter(input);
  const table = isTeachersView ? getTableTeacher(center) : getTable(center);
  const tableRows = removeLast(1, removeTableHead(getTableRows(table)));
  const arrs = tableRows.map(row =>
    getDataFields(removeOuterTag(row)).map(sanitizeInvalid)
  );

  return arrs;
};
