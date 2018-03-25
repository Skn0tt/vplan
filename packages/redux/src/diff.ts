import { Entry } from "vplan-types";
import * as _ from "lodash";

export const diff = (a: Entry[], b: Entry[]): Entry[] => _.difference(b, a);

export default diff;
