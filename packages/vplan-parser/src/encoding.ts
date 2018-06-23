import * as iconv from "iconv-lite";

const convert = (input: Buffer): string => iconv.decode(input, "binary");

export default convert;
