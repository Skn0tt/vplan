import { parseBuffers } from "./";
import * as fs from "fs";
import * as chai from "chai";
import * as _ from "lodash";
import { parseDayInfo } from "./cheerio";

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
      const result = parseBuffers([file]);

      expect(result).toBeInstanceOf(Object);
      expect(result.date).toBeInstanceOf(Date);
      expect(result.date.toLocaleDateString()).toBeTruthy();
      expect(result).toMatchSnapshot();
    });
  }

  describe("outputs the right results", () => {
    test("subst_011.htm", async () => {
      const file = await loadFile(__dirname + "/../res/" + "subst_011.htm");
      const result = parseBuffers([file]);

      expect(result.entries.student["5A"]).toHaveLength(3);
      expect(result.entries.student["5B"]).toHaveLength(1);
      expect(result.entries.student["5C"]).toHaveLength(3);
      expect(result.entries.student["5D"]).toHaveLength(3);
      expect(result.entries.student["6A"]).toHaveLength(2);
      expect(result.entries.student["6B"]).toHaveLength(2);
      expect(result.entries.student["6D"]).toHaveLength(1);
      expect(result.entries.student["7A"]).toHaveLength(1);
      expect(result.entries.student["7B"]).toHaveLength(1);
      expect(result.entries.student["7C"]).toHaveLength(1);
      expect(result.entries.student["8A"]).toHaveLength(4);
      expect(result.entries.student["8D"]).toHaveLength(1);
      expect(result.entries.student["9A"]).toHaveLength(11);
      expect(result.entries.student["9B"]).toHaveLength(15);
      expect(result.entries.student["9C"]).toHaveLength(11);
      expect(result.entries.student["9D"]).toHaveLength(10);
      expect(result.entries.student["EF"]).toHaveLength(11);
      expect(result.entries.student["Q1"]).toHaveLength(10);
      expect(result.entries.student["EWS"]).toHaveLength(1);
      expect(result.entries.student["AG"]).toHaveLength(1);
    });

    test("subst_010.htm", async () => {
      const file = await loadFile(__dirname + "/../res/" + "subst_010.htm");
      const result = parseBuffers([file]);

      expect(result.entries.student["5A"]).toBeUndefined();
      expect(result.entries.student["5B"]).toBeUndefined();
      expect(result.entries.student["5C"]).toHaveLength(1);
      expect(result.entries.student["5D"]).toBeUndefined();
      expect(result.entries.student["6A"]).toBeUndefined();
      expect(result.entries.student["6B"]).toBeUndefined();
      expect(result.entries.student["6D"]).toBeUndefined();
      expect(result.entries.student["7A"]).toHaveLength(2);
      expect(result.entries.student["7B"]).toHaveLength(2);
      expect(result.entries.student["7C"]).toHaveLength(2);
      expect(result.entries.student["7D"]).toHaveLength(2);
      expect(result.entries.student["8A"]).toHaveLength(5);
      expect(result.entries.student["8B"]).toHaveLength(2);
      expect(result.entries.student["8C"]).toHaveLength(4);
      expect(result.entries.student["8D"]).toHaveLength(3);
      expect(result.entries.student["9A"]).toHaveLength(1);
      expect(result.entries.student["9B"]).toHaveLength(1);
      expect(result.entries.student["9C"]).toHaveLength(2);
      expect(result.entries.student["9D"]).toHaveLength(1);
      expect(result.entries.student["EF"]).toHaveLength(6);
      expect(result.entries.student["Q1"]).toHaveLength(5);
      expect(result.entries.student["EWS"]).toBeUndefined();
      expect(result.entries.student["AG"]).toBeUndefined();
    });
  });

  describe("version detection", () => {
    it("outputs the right timestamp", async () => {
      const file = await loadFile(__dirname + "/../res/subst_001.htm");
      const result = parseBuffers([file]);

      expect(result.date.toISOString()).toEqual("2018-03-08T11:37:00.000Z");
    });
  });
});

describe("parseDayInfo", () => {
  test("t_subst_010.htm", async () => {
    const file = await loadFile(__dirname + "/../res/t_subst_010.htm");

    const result = parseDayInfo(file.toString());

    expect(result.missingTeachers).toHaveLength(9);
    expect(result.blockedRooms).toHaveLength(0);
    expect(new Date(result.day)).toBeTruthy();
    expect(result.week).toEqual("A");
    expect(result.missingGroups).toHaveLength(0);
  });

  test("t_subst_011.htm", async () => {
    const file = await loadFile(__dirname + "/../res/t_subst_011.htm");

    const result = parseDayInfo(file.toString());

    expect(result.missingTeachers).toHaveLength(7);
    expect(result.blockedRooms).toHaveLength(0);
    expect(new Date(result.day)).toBeTruthy();
    expect(result.week).toEqual("A");
    expect(result.missingGroups).toHaveLength(0);
  });

  test("t_subst_003.htm", async () => {
    const file = await loadFile(__dirname + "/../res/t_subst_003.htm");

    const result = parseDayInfo(file.toString());

    expect(result.missingTeachers).toHaveLength(13);
    expect(result.blockedRooms).toHaveLength(1);
    expect(new Date(result.day)).toBeTruthy();
    expect(result.week).toEqual("A");
    expect(result.missingGroups).toHaveLength(0);
  });

  test("t_subst_004.htm", async () => {
    const file = await loadFile(__dirname + "/../res/t_subst_004.htm");

    const result = parseDayInfo(file.toString());

    expect(result.missingTeachers).toHaveLength(12);
    expect(result.blockedRooms).toHaveLength(0);
    expect(new Date(result.day)).toBeTruthy();
    expect(result.week).toEqual("A");
    expect(result.missingGroups).toHaveLength(0);
  });

  test("t_subst_007.htm", async () => {
    const file = await loadFile(__dirname + "/../res/t_subst_007.htm");

    const result = parseDayInfo(file.toString());

    expect(result.missingTeachers).toHaveLength(7);
    expect(result.blockedRooms).toHaveLength(0);
    expect(result.week).toEqual("B");
    expect(result.missingGroups).toHaveLength(1);

    const day = new Date(result.day);
    expect(day.getDate()).toEqual(17);
    expect(day.getMonth()).toEqual(3);
    expect(day.getFullYear()).toEqual(2018);
  });
});
