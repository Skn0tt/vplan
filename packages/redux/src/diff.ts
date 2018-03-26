import { Entry } from "vplan-types";
import * as _ from "lodash";
import { hashEntry } from "vplan-util";

export const diff = (oldE: Entry[], newE: Entry[]): Entry[] =>
  _.differenceBy(newE, oldE, hashEntry);

export default diff;
