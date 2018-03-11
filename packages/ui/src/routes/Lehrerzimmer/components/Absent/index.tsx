import * as React from "react";
import { Teacher } from "vplan-types";
import { Paper, Typography } from "material-ui";

/**
 * # Helpers
 */
const join = (arr: string[]) => (arr.length === 0 ? "/" : arr.join(", "));

/**
 * # Component Types
 */
interface OwnProps {
  now: Teacher[];
  next: Teacher[];
}
type Props = OwnProps;

/**
 * # Component
 */
const Absent: React.SFC<Props> = props => {
  const { now, next } = props;

  return (
    <Paper>
      <Typography variant="title">Abwesende Kollegen:</Typography>
      <Typography variant="body1">Diese Woche: {join(now)}</Typography>
      <Typography variant="body1">Nächste Woche: {join(next)}</Typography>
    </Paper>
  );
};

export default Absent;
