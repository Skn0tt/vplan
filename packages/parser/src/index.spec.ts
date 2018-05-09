import { parseBuffers } from "./";
import * as fs from "fs";
import * as chai from "chai";
import * as _ from "lodash";
import { parseDayInfo } from "./cheerio";
import { Entries } from "vplan-types";

const loadFile = (path: string): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    fs.readFile(
      __dirname + path,
      (err, data) => (!!err ? resolve() : resolve(data))
    );
  });

const loadFiles = async (paths: string[]) =>
  await Promise.all(paths.map(async p => loadFile(p)));

const assertEntries = (
  expected: { [short: string]: number },
  actual: Entries
) => {
  _.forEach(actual, (v, k) => {
    const expectedLength = expected[k];
    if (!expectedLength) {
      console.error(k);
    }
    expect(expectedLength).toBeDefined();
    expect(v).toHaveLength(expectedLength);
  });
};

describe("parser", () => {
  describe("snapshots", () => {
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
      "subst_012.htm",
      "subst_013.htm",
      "subst_014.htm",
      "subst_015.htm",
      "subst_016.htm",
      "subst_017.htm",
      "subst_018.htm",
      "t_subst_003.htm",
      "t_subst_004.htm",
      "t_subst_005.htm",
      "t_subst_006.htm",
      "t_subst_007.htm",
      "t_subst_008.htm",
      "t_subst_009.htm",
      "t_subst_010.htm",
      "t_subst_011.htm",
      "t_subst_012.htm",
      "t_subst_013.htm",
      "t_subst_014.htm",
      "t_subst_015.htm",
      "t_subst_016.htm",
      "t_subst_017.htm",
      "t_subst_018.htm",
      "teacher_subst_001.htm",
      "teacher_subst_002.htm"
    ];

    for (const path of paths) {
      test(path, async () => {
        const file = await loadFile("/../res/" + path);
        const result = parseBuffers([file]);

        expect(result).toBeInstanceOf(Object);
        expect(result.date).toBeInstanceOf(Date);
        expect(result.date.toLocaleDateString()).toBeTruthy();
        expect(result).toMatchSnapshot();
      });
    }
  });

  describe("outputs the right results", () => {
    test("subst_011.htm", async () => {
      const file = await loadFile("/../res/" + "subst_011.htm");
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
      const file = await loadFile("/../res/" + "subst_010.htm");
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

    test("subst_001.1.htm", async () => {
      const file = await loadFile("/../res/" + "subst_001.1.htm");
      const result = parseBuffers([file]);

      assertEntries(
        {
          "5D": 2,
          "6A": 2,
          "6B": 1,
          "6C": 2,
          "7A": 1,
          "7C": 2,
          "7D": 2,
          "9A": 1,
          "9B": 2,
          "9C": 2,
          "9D": 3,
          EF: 9,
          Q2: 3,
          ABB: 1
        },
        result.entries.student
      );
    });

    test("subst_002.htm", async () => {
      const file = await loadFile("/../res/" + "subst_002.htm");
      const result = parseBuffers([file]);

      assertEntries(
        {
          "5A": 1,
          "5B": 1,
          "6A": 3,
          "7C": 1,
          "8A": 1,
          "9A": 1,
          "9B": 2,
          EF: 3,
          Q1: 14,
          Q2: 8,
          GL: 2
        },
        result.entries.student
      );
    });

    test("subst_003.htm", async () => {
      const file = await loadFile("/../res/" + "subst_003.htm");
      const result = parseBuffers([file]);

      assertEntries(
        {
          "-----": 5,
          AG: 1,
          Q2: 42,
          Q1: 8,
          EF: 5,
          "9D": 3,
          "9C": 5,
          "9B": 1,
          "9A": 2,
          "8D": 3,
          "8C": 2,
          "8B": 1,
          "8A": 3,
          "7D": 1,
          "7C": 2,
          "7B": 3,
          "7A": 2,
          "6D": 2,
          "6C": 1,
          "6B": 3,
          "6A": 5,
          "5B": 1,
          "5A": 1
        },
        result.entries.student
      );
    });

    // Ensures Fix: "VK E1" not missing
    test("subst_014.htm", async () => {
      const file = await loadFile("/../res/" + "subst_014.htm");
      const result = parseBuffers([file]);

      assertEntries(
        {
          "-----": 1,
          GL: 1,
          ABB: 1,
          Q1: 6,
          EF: 8,
          "9D": 1,
          "9C": 1,
          "9B": 1,
          "8D": 8,
          "8B": 2,
          "6D": 1,
          "6C": 1,
          "6B": 1,
          "5C": 2,
          "5B": 2
        },
        result.entries.student
      );
    });

    // Ensures Fix: "VK E1" not missing
    test("subst_016.htm", async () => {
      const file = await loadFile("/../res/" + "subst_016.htm");
      const result = parseBuffers([file]);

      assertEntries(
        {
          LR: 1,
          Q1: 2,
          EF: 12,
          "9D": 4,
          "9C": 1,
          "9B": 2,
          "9A": 1,
          "8D": 2,
          "8C": 3,
          "8B": 2,
          "8A": 4,
          "7D": 3,
          "7C": 3,
          "7B": 1,
          "7A": 1,
          "6D": 9,
          "6C": 10,
          "6B": 12,
          "6A": 9,
          "5C": 1,
          "5B": 2
        },
        result.entries.student
      );
    });
  });

  describe("version detection", () => {
    it("outputs the right timestamp", async () => {
      const file = await loadFile("/../res/subst_001.htm");
      const result = parseBuffers([file]);

      expect(result.date.toISOString()).toEqual("2018-03-08T11:37:00.000Z");
    });
  });
});

describe("parseDayInfo", () => {
  test("t_subst_010.htm", async () => {
    const file = await loadFile("/../res/t_subst_010.htm");

    const result = parseDayInfo(file.toString());

    expect(result.missingTeachers).toHaveLength(9);
    expect(result.blockedRooms).toHaveLength(0);
    expect(new Date(result.day)).toBeTruthy();
    expect(result.week).toEqual("A");
    expect(result.missingGroups).toHaveLength(0);
  });

  test("t_subst_011.htm", async () => {
    const file = await loadFile("/../res/t_subst_011.htm");

    const result = parseDayInfo(file.toString());

    expect(result.missingTeachers).toHaveLength(7);
    expect(result.blockedRooms).toHaveLength(0);
    expect(new Date(result.day)).toBeTruthy();
    expect(result.week).toEqual("A");
    expect(result.missingGroups).toHaveLength(0);
  });

  test("t_subst_003.htm", async () => {
    const file = await loadFile("/../res/t_subst_003.htm");

    const result = parseDayInfo(file.toString());

    expect(result.missingTeachers).toHaveLength(13);
    expect(result.blockedRooms).toHaveLength(1);
    expect(new Date(result.day)).toBeTruthy();
    expect(result.week).toEqual("A");
    expect(result.missingGroups).toHaveLength(0);
  });

  test("t_subst_004.htm", async () => {
    const file = await loadFile("/../res/t_subst_004.htm");

    const result = parseDayInfo(file.toString());

    expect(result.missingTeachers).toHaveLength(12);
    expect(result.blockedRooms).toHaveLength(0);
    expect(new Date(result.day)).toBeTruthy();
    expect(result.week).toEqual("A");
    expect(result.missingGroups).toHaveLength(0);
  });

  test("t_subst_007.htm", async () => {
    const file = await loadFile("/../res/t_subst_007.htm");

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

describe("merger", () => {
  it("merges correctly", async () => {
    const paths = [
      "/../res/t_subst_016.htm",
      "/../res/subst_016.htm",
      "/../res/subst_017.htm"
    ];
    const files = await loadFiles(paths);

    const result = parseBuffers(files);

    assertEntries(
      {
        LR: 1,
        Q1: 5,
        EF: 15,
        "9D": 4,
        "9C": 2,
        "9B": 2,
        "9A": 5,
        "8D": 3,
        "8C": 4,
        "8B": 5,
        "8A": 5,
        "7D": 4,
        "7C": 6,
        "7B": 1,
        "7A": 3,
        "6D": 17,
        "6C": 18,
        "6B": 22,
        "6A": 16,
        "5C": 2,
        "5D": 1,
        "5B": 2
      },
      result.entries.student
    );
  });
});
