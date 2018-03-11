import * as iconv from "iconv-lite";

const convert = (input: Buffer): string => iconv.decode(input, "ISO-8859-1");

export default convert;
