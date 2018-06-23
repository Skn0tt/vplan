import { AnyEntry } from "vplan-types";
import * as _ from "lodash";
import { format as _format } from "date-fns";
import * as deLocale from "date-fns/locale/de";

const format = (template: string) => (d: Date) =>
  _format(d, template, { locale: deLocale });

export const localiseDate = format("dddd, D. MMMM");

export const localiseDateWeekday = format("dddd");

export const groupByDay = (entries: ReadonlyArray<AnyEntry>) =>
  _.values(_.groupBy(entries, "day"));

export const today = (): Date => {
  const result = new Date();

  result.setHours(0, 0, 0, 0);

  return result;
};

export const isInFuture = (d: Date): boolean => +d >= +today();

export const localiseTime = format("dddd, HH:mm:ss");
