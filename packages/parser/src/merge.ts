import { Entries } from "vplan-types";
import _ = require("lodash");

const merge = (...groups: Entries[]) =>
  _.merge(_.head(groups), ..._.tail(groups));

export default merge;
