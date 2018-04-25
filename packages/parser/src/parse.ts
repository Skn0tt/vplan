import sampleinput from "./sampleinput";
import {
  Entry,
  Short,
  Types,
  StudentEntry,
  TeacherEntry,
  Group,
  DayInfo
} from "vplan-types";
import * as _ from "lodash";
import { Row } from "vplan-parser";

const find = (text: string, input: string) => input.indexOf(text);
const findLast = (text: string, input: string) => input.lastIndexOf(text);

const getBetweenFirstAndLast = (delimiter: string, input: string) =>
  input.substring(find(delimiter, input), findLast(delimiter, input));

const getBetween = (begin: string, end: string, input: string) =>
  input.substring(find(begin, input), find(end, input));

const MON_TITLE_DIV = '<div class="mon_title">';
const getMonTitle = (input: string) => {
  const start = input.substring(
    find(MON_TITLE_DIV, input) + MON_TITLE_DIV.length
  );
  const end = start.substring(0, find("</div>", start));
  return end;
};

const getBetweenTags = (tag: string, input: string) =>
  getBetween(`<${tag}`, `</${tag}`, input);

const getCenter = (input: string) => getBetweenTags("center", input);
const getTable = (input: string) => getBetweenTags("table", input);
const getDiv = (input: string) => getBetweenTags("div", input);
const getTableTeacher = (input: string) =>
  getTable(getBetweenFirstAndLast("<p>", input));

const dropFirst = _.tail;

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

export const isTeachersView = (input: string): boolean =>
  input.includes("Nachrichten zum Tag");

const invalid = ["&nbsp;", "+"];

const isValid = (item: string) => invalid.indexOf(item) === -1;

const sanitizeInvalid = (item: string) => (isValid(item) ? item : "");

const getWeek = (input: string): "A" | "B" =>
  getDiv(getCenter(input)).slice(-1) as "A" | "B";

export const parseExportDate = (input: string): Date => {
  const stand = getBetween("Stand: ", "</p>", input);
  const date = stand.slice(7);
  let parts = date.split(".");
  parts = [parts[0], parts[1], ...parts[2].split(" ")];
  parts = [parts[0], parts[1], parts[2], ...parts[3].split(":")];
  const [day, month, year, hour, minute] = parts;

  const result = new Date(0);
  result.setFullYear(+year, +month - 1);
  result.setDate(+day);
  result.setHours(+hour, +minute);

  return result;
};

export const parseDate = (input: string): Date => {
  const mon_title = getMonTitle(input);
  const date = mon_title.split(" ")[0];
  const nums = date.split(".").map(Number);

  const result = new Date(0);
  result.setFullYear(nums[2], nums[1] - 1, nums[0]);

  return result;
};

export const parseTable = (isTeachersView: boolean) => (
  input: string
): Row[] => {
  const center = getCenter(input);
  const table = isTeachersView ? getTableTeacher(center) : getTable(center);
  const tableRows = removeLast(1, removeTableHead(getTableRows(table)));
  const arrs = tableRows.map(row =>
    getDataFields(removeOuterTag(row)).map(sanitizeInvalid)
  );

  return arrs;
};

export const parseDayInfo = (input: string): DayInfo => {
  const infoTable = removeFirstTag(getTable(getCenter(input)));
  const rows = dropFirst(removeLast(1, getTableRows(infoTable)));
  const arrs = rows.map(row => getDataFields(removeOuterTag(row)));

  const missingTeachersArr = arrs.find(v =>
    v[0].startsWith("Abwesende Lehrer")
  );
  const missingGroupsArr = arrs.find(v => v[0].startsWith("Abwesende Klassen"));
  const blockedRoomsArr = arrs.find(v => v[0].startsWith("Blockierte"));

  return {
    day: +parseDate(input),
    week: getWeek(input),
    blockedRooms: !!blockedRoomsArr ? blockedRoomsArr[1].split(", ") : [],
    missingGroups: !!missingGroupsArr
      ? (missingGroupsArr[1].split(", ") as Group[])
      : [],
    missingTeachers: !!missingTeachersArr
      ? missingTeachersArr[1].split(", ")
      : []
  };
};
