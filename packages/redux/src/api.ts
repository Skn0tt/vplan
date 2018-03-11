import { fromJS, Map } from "immutable";
import {
  config,
  AllEntriesRecord,
  TeacherEntriesMap,
  StudentEntriesMap,
  PutInfoPayload,
  PutEntriesPayload
} from "./";
import { StudentEntries, AllEntries, TeacherEntries, Entry } from "vplan-types";

/**
 * # Helpers
 */
const { baseUrl } = config;

const toImmutable = (json: Partial<AllEntries>) =>
  new AllEntriesRecord({
    student: Map(json.student),
    teacher: Map(json.teacher)
  });

const transform = (json: any) => toImmutable(json);

const postConfig = (body: any, secret: string, contenttype: string) => ({
  body,
  method: "POST",
  headers: {
    Authorization: new Buffer(`Basic Admin:${secret}`).toString("base64"),
    "content-type": contenttype
  }
});

/**
 * # API
 */
export const fetchEntries = async () => {
  try {
    const data = await fetch(`${baseUrl}/entries`);
    const json = await data.json();

    return transform(json);
  } catch (error) {
    throw error;
  }
};

export const fetchEntriesTeacher = async () => {
  try {
    const data = await fetch(`${baseUrl}/entries/teacher`);
    const json = await data.json();

    return transform({ teacher: json });
  } catch (error) {
    throw error;
  }
};

export const fetchEntriesStudent = async () => {
  try {
    const data = await fetch(`${baseUrl}/entries/student`);
    const json = await data.json();

    return transform({ student: json });
  } catch (error) {
    throw error;
  }
};

export const fetchTeachers = async () => {
  try {
    const data = await fetch(`${baseUrl}/teachers`);
    const json = await data.json();

    return json;
  } catch (error) {
    throw error;
  }
};

export const putEntries = async (payload: PutEntriesPayload) => {
  try {
    const data = new FormData();

    data.append("files[]", payload.studentToday, "studentToday");
    data.append("files[]", payload.studentTomorrow, "studentTomorrow");
    data.append("files[]", payload.teacherToday, "teacherToday");
    data.append("files[]", payload.teacherTomorrow, "teacherTomorrow");

    const response = await fetch(
      `${baseUrl}/info`,
      postConfig(data, payload.secret, "multipart/form-data")
    );

    if (response.status !== 200) {
      throw new Error("Request failed.");
    }
  } catch (error) {
    throw error;
  }
};

export const putInfo = async (payload: PutInfoPayload) => {
  try {
    const body = JSON.stringify(payload.info);
    const response = await fetch(
      `${baseUrl}/info`,
      postConfig(body, payload.secret, "application/json")
    );

    if (response.status !== 200) {
      throw new Error("Request failed.");
    }
  } catch (error) {
    throw error;
  }
};

export const fetchInfo = async () => {
  try {
    const data = await fetch(`${baseUrl}/info`);
    const json = await data.json();

    return json;
  } catch (error) {
    throw error;
  }
};
