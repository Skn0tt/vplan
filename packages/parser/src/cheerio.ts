import * as cheerio from "cheerio";
import { ENGINE_METHOD_PKEY_ASN1_METHS } from "constants";
import { Entry, Grouped, DayInfo } from "vplan-types";
import { toStudentEntry, MapToEntry, toTeacherEntry } from "./convert";
import { groupStudents, GroupEntries, groupTeachers } from "./helpers";
import * as _ from "lodash";

type Predicate<T> = (a: T) => boolean;
type Parse<T> = (input: string) => T;

export const isTeachersView: Predicate<string> = input => {
  const $ = cheerio.load(input);

  return !!$(".info").length;
};

const toDate = (date: string, time: string): Date => {
  const [day, month, year] = date.split(".");
  const [hour, minute] = time.split(":");

  const result = new Date();

  result.setFullYear(+year, +month - 1, +day);
  result.setHours(+hour, +minute);
  result.setSeconds(0, 0);

  return result;
};

export const parseExportDate: Parse<Date> = input => {
  const $ = cheerio.load(input);

  const text = $(".mon_head")
    .last()
    .text();
  const stand = text.split("Stand: ")[1].trim();

  const [date, time] = stand.split(" ");

  return toDate(date, time);
};

const hasOneClass = (...of: string[]) => ($: Cheerio) =>
  of.some(c => $.hasClass(c));

const isDividerRow: Predicate<string[]> = row => row.length === 1;

const getGroup = (row: string[]) => row[0];

const parseFile = (
  mapToEntry: MapToEntry,
  group: GroupEntries
): Parse<Grouped<Entry>> => input => {
  const $ = cheerio.load(input);

  const date = toDate(
    $(".mon_title")
      .text()
      .split(" ")[0],
    "01:00"
  );

  const rawRows = $(".mon_list tr")
    .filter((_, el) => hasOneClass("odd", "even")($(el)))
    .toArray();

  const valueRows = rawRows.map(tr => tr.children.map(td => $(td).text()));

  const entries: Entry[] = [];
  let currentGroup = getGroup(valueRows[0]);
  for (const row of valueRows) {
    if (isDividerRow(row)) {
      currentGroup = getGroup(row);
    } else {
      const entry = mapToEntry(date)(currentGroup)(row);
      entries.push(entry);
    }
  }

  const grouped = group(...entries);

  return grouped;
};

export const parseStudentFile = parseFile(toStudentEntry, groupStudents);
export const parseTeacherFile = parseFile(toTeacherEntry, groupTeachers);

const splitAt = (separator: string) => (input: string) =>
  !!input && input.trim() !== "" ? input.split(separator) : [];

const splitAtComma = splitAt(", ");

export const parseDayInfo = (input: string): DayInfo => {
  const $ = cheerio.load(input);

  const mon_title = $("div.mon_title").text();
  const [_date, _a, _b, _week] = mon_title.split(" ");

  const day = +toDate(_date, "00:00");
  const week = _week as "A" | "B";

  const rawRows = $("table.info > tbody > tr.info > td.info")
    .toArray()
    .map(el =>
      $(el)
        .text()
        .trim()
    );

  const rowDict = _.fromPairs(_.chunk(rawRows, 2));

  const missingTeachersString: string = rowDict["Abwesende Lehrer"];
  const missingTeachers = splitAtComma(missingTeachersString);

  const blockedRoomsString: string = _.find(rowDict, (v, k) =>
    k.startsWith("Blockiert")
  );
  const blockedRooms = splitAtComma(blockedRoomsString);

  const missingGroupsString = rowDict["Abwesende Klassen"];
  const missingGroups = splitAtComma(missingGroupsString);

  return {
    missingTeachers,
    blockedRooms,
    missingGroups,
    week,
    day
  };
};
