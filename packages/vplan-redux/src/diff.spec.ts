import { diff } from "./diff";
import { expect } from "chai";
import { AnyEntry } from "vplan-types";

const first: AnyEntry = {
  class: "5A",
  day: +new Date(),
  from: 1,
  to: 2,
  teacher: "BES",
  group: "5A",
  substituteClass: "BIO",
  substituteTeacher: "SPI",
  room: "B204",
  type: "Vertr."
};

const second: AnyEntry = {
  class: "6A",
  day: +new Date(),
  from: 1,
  to: 2,
  teacher: "BES",
  group: "5A",
  substituteClass: "BIO",
  substituteTeacher: "SPI",
  room: "B204",
  type: "Vertr."
};

const third: AnyEntry = {
  class: "6C",
  day: +new Date(),
  from: 1,
  to: 2,
  teacher: "BES",
  group: "5A",
  substituteClass: "BIO",
  substituteTeacher: "SPI",
  room: "B204",
  type: "Vertr."
};

describe("diff", () => {
  describe("when passed equal input", () => {
    it("should return empty array", () => {
      const result = diff([], []);
      expect(result).to.be.empty;
    });

    it("should return empty array", () => {
      const result = diff([first], [first]);
      expect(result).to.be.empty;
    });

    it("should return empty array", () => {
      const result = diff([first, first], [first, first]);
      expect(result).to.be.empty;
    });
  });

  describe("when passed different inputs", () => {
    it("should return a single entry", () => {
      const result = diff([first], [first, second]);

      expect(result).to.be.lengthOf(1);
      expect(result).to.contain(second);
      expect(result).to.not.contain(first);
    });

    it("should return one entry", () => {
      const result = diff([first, first], [first, second]);

      expect(result).to.be.lengthOf(1);
      expect(result).to.contain(second);
      expect(result).to.not.contain(first);
    });

    it("should return one entry", () => {
      const result = diff([first, first], [first, second]);

      expect(result).to.be.lengthOf(1);
      expect(result).to.contain(second);
      expect(result).to.not.contain(first);
    });
  });
});
