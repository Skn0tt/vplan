import { Entry } from "vplan-types";
import * as _ from "lodash";

export const localiseDate = (date: Date) =>
  date.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

export const groupByDay = (entries: ReadonlyArray<Entry>) =>
  _.values(_.groupBy(entries, "day"));