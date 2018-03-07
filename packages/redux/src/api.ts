import { fromJS } from "immutable";
import { config } from "./";

export const fetchData = async () => {
  const data = await fetch(`${config.baseUrl}`);
  const json = await data.json();

  return json;
};
