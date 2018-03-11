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

const toImmutable = (json: Partial<AllEntries>) =>
  new AllEntriesRecord({
    student: Map(json.student),
    teacher: Map(json.teacher)
  });

const transform = (json: any) => toImmutable(json);

const putConfig = (body: any, secret: string, contenttype: string) => ({
  body,
  method: "PUT",
  headers: {
    Authorization: "Basic " + btoa("admin:" + secret),
    "content-type": contenttype
  }
});

/**
 * # API
 */
export const fetchEntries = async () => {
  try {
    const data = await fetch(`${config.baseUrl}/entries`);
    const json = await data.json();

    return transform(json);
  } catch (error) {
    throw error;
  }
};

export const fetchEntriesTeacher = async () => {
  try {
    const data = await fetch(`${config.baseUrl}/entries/teacher`);
    const json = await data.json();

    return transform({ teacher: json });
  } catch (error) {
    throw error;
  }
};

export const fetchEntriesStudent = async () => {
  try {
    const data = await fetch(`${config.baseUrl}/entries/student`);
    const json = await data.json();

    return transform({ student: json });
  } catch (error) {
    throw error;
  }
};

export const fetchTeachers = async () => {
  try {
    const data = await fetch(`${config.baseUrl}/teachers`);
    const json = await data.json();

    return json;
  } catch (error) {
    throw error;
  }
};

export const putEntries = async (payload: PutEntriesPayload) => {
  try {
    const data = new FormData();

    data.set("studentToday", payload.studentToday, "studentToday");
    data.set("studentTomorrow", payload.studentTomorrow, "studentTomorrow");
    data.set("teacherToday", payload.teacherToday, "teacherToday");
    data.set("teacherTomorrow", payload.teacherTomorrow, "teacherTomorrow");

    const response = await fetch(
      `${config.baseUrl}/entries`,
      putConfig(data, payload.secret, "multipart/form-data")
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
      `${config.baseUrl}/info`,
      putConfig(body, payload.secret, "application/json")
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
    const data = await fetch(`${config.baseUrl}/info`);
    const json = await data.json();

    return json;
  } catch (error) {
    throw error;
  }
};

export const fetchInfoTeacher = async () => {
  try {
    const data = await fetch(`${config.baseUrl}/info/teacher`);
    const json = await data.json();

    return json;
  } catch (error) {
    throw error;
  }
};

export const fetchInfoStudent = async () => {
  try {
    const data = await fetch(`${config.baseUrl}/info/student`);
    const json = await data.json();

    return json;
  } catch (error) {
    throw error;
  }
};
