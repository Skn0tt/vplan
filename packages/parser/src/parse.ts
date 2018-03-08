import sampleinput from "./sampleinput";

type HeaderRow = [string];
type DataRow = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

type Row = HeaderRow | DataRow;

const find = (text: string, input: string) => input.indexOf(text);
const findLast = (text: string, input: string) => input.lastIndexOf(text);

const getBetween = (begin: string, end: string, input: string) =>
  input.substring(find(begin, input), find(end, input));

const getBetweenTags = (tag: string, input: string) =>
  getBetween(`<${tag}`, `</${tag}`, input);

const getCenter = (input: string) => getBetweenTags("center", input);
const getTable = (input: string) => getBetweenTags("table", input);

const lines = (input: string) => input.split("\n");
const getTableRows = (input: string) => lines(input).slice(1);
const removeTableHead = (rows: string[]) => rows.slice(2);
const removeLast = (nmb: number, rows: string[]) => rows.slice(0, -nmb);
const removeOuterTag = (row: string) =>
  row.slice(find(">", row) + 1, findLast("<", row));
const removeFirstTag = (row: string) => row.slice(find(">", row) + 1);

const getDataFields = (row: string) =>
  row
    .split("</td>")
    .map(removeFirstTag)
    .map(item => (hasOuterTag(item) ? removeOuterTag(item) : item));

const hasOuterTag = (row: string) => row.startsWith("<") && row.endsWith(">");

const invalid = ["&nbsp;", "---", "+"];

const sanitizeInvalid = (item: string) =>
  invalid.indexOf(item) !== -1 ? "" : item;

const parse = (input: string): ReadonlyArray<ReadonlyArray<string>> => {
  const center = getCenter(input);
  const table = getTable(center);
  const tableRows = removeLast(1, removeTableHead(getTableRows(table)));
  return tableRows.map(row =>
    getDataFields(removeOuterTag(row)).map(sanitizeInvalid)
  );
};

export default parse;
