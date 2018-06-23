import { AnyEntry } from "vplan-types";
import * as _ from "lodash";
import { hashEntry } from "vplan-util";

export const diff = (oldE: AnyEntry[], newE: AnyEntry[]): AnyEntry[] =>
  _.differenceBy(newE, oldE, hashEntry);

export default diff;
