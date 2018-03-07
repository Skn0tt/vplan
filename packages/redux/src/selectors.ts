import { AppState } from "./types";
import { Class, Teacher } from "vplan-types";

type Selector<T> = (state: AppState) => T;

//TODO: implement
export const getInfo: Selector<string> = state => "";

export const getClass: Selector<Class> = state => state.get("class");
export const isLoading: Selector<boolean> = state => state.get("loading") > 0;

export const getTeacher = (short: string): Selector<Teacher> => state =>
  state.getIn(["teachers", short]);
