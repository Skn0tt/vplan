import { Entries } from "vplan-types";
import * as _ from "lodash";

const merge = (...groups: Entries[]) =>
  _.merge(_.head(groups), ..._.tail(groups));

export default merge;
