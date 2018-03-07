import { fromJS } from "immutable";
import { config } from "./";

export const fetchEntries = async () => {
  const data = await fetch(`${config.baseUrl}/entries`);
  const json = await data.json();

  return json;
};

export const fetchTeachers = async () => {
  const data = await fetch(`${config.baseUrl}/teachers`);
  const json = await data.json();

  return json;
};
