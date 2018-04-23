import { parseFiles } from "./";
import * as fs from "fs";
import * as chai from "chai";
import * as _ from "lodash";

const loadFile = (path: string): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (!!err ? resolve() : resolve(data)));
  });

describe("parser", () => {
  const paths = [
    "subst_001.htm",
    "subst_001.1.htm",
    "subst_002.htm",
    "subst_002.1.htm",
    "subst_003.htm",
    "subst_004.htm",
    "subst_005.htm",
    "subst_006.htm",
    "subst_007.htm",
    "subst_008.htm",
    "subst_009.htm",
    "subst_010.htm",
    "subst_011.htm",
    "t_subst_003.htm",
    "t_subst_004.htm",
    "t_subst_005.htm",
    "t_subst_006.htm",
    "t_subst_007.htm",
    "t_subst_008.htm",
    "t_subst_009.htm",
    "t_subst_010.htm",
    "t_subst_011.htm",
    "teacher_subst_001.htm",
    "teacher_subst_002.htm"
  ];

  for (const path of paths) {
    it(path, async () => {
      const file = await loadFile(__dirname + "/../res/" + path);
      const result = parseFiles([file]);

      expect(result).toBeInstanceOf(Object);
      expect(result).toMatchSnapshot();
    });
  }
});
