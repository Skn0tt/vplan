import { Row, Grouped } from "vplan-parser";
import { StudentEntry, TeacherEntry } from "vplan-types";

const group = (input: ReadonlyArray<Row>): Readonly<Grouped<Row>> => {
  const result: Grouped<Row> = {};

  let current: string;
  for (const row of input) {
    if (row.length === 2) {
      current = row[0];
      result[current] = [];
    } else {
      result[current].push(row);
    }
  }

  return result;
};

export default group;
