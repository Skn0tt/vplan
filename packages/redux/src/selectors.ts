import { AppState } from "./types";
import { Group, Teacher, Class, TeacherInfo, Entry } from "vplan-types";

type Selector<T> = (state: AppState) => T;

//TODO: implement
export const getInfo: Selector<string> = state => "";

export const filterEntries = (
  short: Group | Teacher
): Selector<ReadonlyArray<Entry>> => state =>
  state
    .get("entries")
    .filter(entry => entry.class === short || entry.teacher === short);

export const isMarked = (c: Class): Selector<boolean> => state =>
  state.get("marked").has(c);

export const getGroup: Selector<Group> = state => state.get("group");
export const isLoading: Selector<boolean> = state => state.get("loading") > 0;

export const getTeacherInfo = (short: string): Selector<TeacherInfo> => state =>
  state.getIn(["teachers", short]);
