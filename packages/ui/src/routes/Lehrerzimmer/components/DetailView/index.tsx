import * as React from "react";
import { TeacherEntry, Teacher } from "vplan-types";
import {
  Grid,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow
} from "material-ui";

/**
 * Helper
 */
const sortEntries = (a: TeacherEntry, b: TeacherEntry): number => {
  if (a.day !== b.day) {
    return +a.day - +b.day;
  }

  return a.from - b.from;
};

/**
 * Component Types
 */
interface OwnProps {
  entries: TeacherEntry[];
}
type Props = OwnProps;

/**
 * Component
 */
const DetailView: React.SFC<Props> = props => {
  const { entries } = props;
  return (
    <Grid container>
      <Grid item>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Art</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Raum</TableCell>
              <TableCell>Zeit</TableCell>
              <TableCell>Statt</TableCell>
              <TableCell>Fach</TableCell>
              <TableCell>Ersatzfach</TableCell>
              <TableCell>Klasse</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.sort(sortEntries).map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.type}</TableCell>
                <TableCell>
                  {new Date(entry.day).toLocaleDateString("de-DE", {
                    weekday: "long"
                  })}
                </TableCell>
                <TableCell>{entry.room}</TableCell>
                <TableCell>
                  {entry.from === entry.to
                    ? entry.from
                    : `${entry.from} - ${entry.to}`}
                </TableCell>
                <TableCell>{entry.teacher}</TableCell>
                <TableCell>{entry.class}</TableCell>
                <TableCell>{entry.substituteClass}</TableCell>
                <TableCell>{entry.group}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default DetailView;
