import { Entry } from "vplan-types";
import * as _ from "lodash";
import { format } from "date-fns";
import * as deLocale from "date-fns/locale/de";

export const localiseDate = (d: Date) =>
  format(d, "dddd, D. MMMM", { locale: deLocale });

export const localiseDateWeekday = (d: Date) =>
  format(d, "dddd", { locale: deLocale });

export const groupByDay = (entries: ReadonlyArray<Entry>) =>
  _.values(_.groupBy(entries, "day"));

export const today = (): Date => {
  const result = new Date();

  result.setHours(0, 0, 0, 0);

  return result;
};

export const isInFuture = (d: Date): boolean => +d >= +today();
