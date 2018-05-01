import { Entry } from "vplan-types";
import * as _ from "lodash";
const moment = require("moment");

export const localiseDate = (d: Date) =>
  moment(d)
    .locale("de")
    .format("dddd, D. MMMM");

export const groupByDay = (entries: ReadonlyArray<Entry>) =>
  _.values(_.groupBy(entries, "day"));

export const today = (): Date => {
  const result = new Date();

  result.setHours(0, 0, 0, 0);

  return result;
};

export const isInFuture = (d: Date): boolean => +d >= +today();
