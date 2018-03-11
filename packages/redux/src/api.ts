import { fromJS, Map } from "immutable";
import {
  config,
  AllEntriesRecord,
  TeacherEntriesMap,
  StudentEntriesMap
} from "./";
import { StudentEntries, AllEntries, TeacherEntries, Entry } from "vplan-types";

const toImmutable = (json: Partial<AllEntries>) =>
  new AllEntriesRecord({
    student: Map(json.student),
    teacher: Map(json.teacher)
  });

const transform = (json: any) => toImmutable(json);

export const fetchEntries = async () => {
  const data = await fetch(`${config.baseUrl}/entries`);
  const json = await data.json();

  return transform(json);
};

export const fetchEntriesTeacher = async () => {
  const data = await fetch(`${config.baseUrl}/entries/teacher`);
  const json = await data.json();

  return transform({ teacher: json });
};

export const fetchEntriesStudent = async () => {
  const data = await fetch(`${config.baseUrl}/entries/student`);
  const json = await data.json();

  return transform({ student: json });
};

export const fetchTeachers = async () => {
  const data = await fetch(`${config.baseUrl}/teachers`);
  const json = await data.json();

  return json;
};
