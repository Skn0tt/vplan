import { Entry, Grouped, DayInfo, AllDayInfo, AllEntries } from "vplan-types";
import bufferToString from "./encoding";
import * as _ from "lodash";
import { isTeachersView, parseExportDate, parseStudentFile, parseTeacherFile, parseDayInfo } from './cheerio';
import { sortStudentTeacher, toAllDayInfo, merge } from './helpers';

export type ParseResult = { entries: AllEntries; info: AllDayInfo; date: Date };

export const parseBuffers = (buffers: Buffer[]): ParseResult => {
  const files = buffers.map(bufferToString);

  const { teacherFiles, studentFiles } = sortStudentTeacher(...files);
  
  const studentEntryInfos = studentFiles.map(parseStudentFile);
  const allStudentEntryInfo = merge(...studentEntryInfos);

  const teacherEntryInfos = teacherFiles.map(parseTeacherFile);
  const allTeacherEntryInfo = merge(...teacherEntryInfos);

  const dayInfos = teacherFiles.map(parseDayInfo);
  const info = toAllDayInfo(...dayInfos);

  const exportDates = files.map(parseExportDate);
  const maxExportDate = new Date(Math.max(...exportDates.map(v => +v)))
  
  return {
    info,
    entries: {
      student: allStudentEntryInfo,
      teacher: allTeacherEntryInfo
    },
    date: maxExportDate,
  };
};
