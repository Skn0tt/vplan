import { fromJS, Map } from "immutable";
import {
  config,
  AllEntriesRecord,
  TeacherEntriesMap,
  StudentEntriesMap,
  PutInfoPayload,
  PutEntriesPayload,
  InfoRecord
} from "./";
import {
  AllEntries,
  TeacherEntries,
  AnyEntry,
  DayInfo,
  Short,
  BaseEntry
} from "vplan-types";

/**
 * # Helpers
 */

const toImmutable = (json: Partial<AllEntries>) =>
  new AllEntriesRecord({
    student: Map(json.student!),
    teacher: Map(json.teacher!)
  });

const transform = (json: any) => toImmutable(json);

const putConfig = (body: any, secret: string) => ({
  body,
  method: "PUT",
  headers: {
    Authorization: "Basic " + btoa("admin:" + secret)
  }
});

const putConfigWithContentType = (
  body: any,
  secret: string,
  contenttype: string
) => ({
  body,
  method: "PUT",
  headers: {
    Authorization: "Basic " + btoa("admin:" + secret),
    "Content-Type": contenttype
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

    return Map(json);
  } catch (error) {
    throw error;
  }
};

export const fetchEntriesStudent = async () => {
  try {
    const data = await fetch(`${config.baseUrl}/entries/student`);
    const json = await data.json();

    return Map<Short, BaseEntry[]>(json);
  } catch (error) {
    throw error;
  }
};

export const fetchDayInfo = async () => {
  try {
    const data = await fetch(`${config.baseUrl}/dayInfo`);
    const json = await data.json();

    return Map<number, DayInfo>(json);
  } catch (error) {
    throw error;
  }
};

export const fetchRefreshtime = async (): Promise<Date> => {
  try {
    const res = await fetch(`${config.baseUrl}/entries/refreshtime`);
    const date = await res.text();
    return new Date(date);
  } catch (error) {
    throw error;
  }
};

export const putEntries = async (payload: PutEntriesPayload) => {
  try {
    const data = new FormData();

    payload.files.forEach(f => data.append("files", f));

    const response = await fetch(
      `${config.baseUrl}/entries`,
      putConfig(data, payload.secret)
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
      putConfigWithContentType(body, payload.secret, "application/json")
    );

    const json = await response.json();

    if (response.status !== 200) {
      throw new Error("Request failed.");
    }

    return new InfoRecord(json);
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
