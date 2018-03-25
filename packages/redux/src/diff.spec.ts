import { diff } from "./diff";
import { expect } from "chai";
import { Entry, Types } from "vplan-types";

const first: Entry = {
  class: "5A",
  day: +new Date(),
  from: 1,
  to: 2,
  teacher: "BES",
  group: "5A",
  substituteClass: "BIO",
  substituteTeacher: "SPI",
  room: "B204",
  type: Types.VERTRETUNG
};

const second: Entry = {
  class: "6A",
  day: +new Date(),
  from: 1,
  to: 2,
  teacher: "BES",
  group: "5A",
  substituteClass: "BIO",
  substituteTeacher: "SPI",
  room: "B204",
  type: Types.VERTRETUNG
};

describe("Diff Algorithm", () => {
  it("should return empty array", () => {
    const result = diff([], []);
    expect(result).to.be.empty;
  });

  it("should return empty array", () => {
    const result = diff([first], [first]);
    expect(result).to.be.empty;
  });

  it("should return one entry", () => {
    const result = diff([first], [first, second]);

    expect(result).to.be.lengthOf(1);
    expect(result).to.contain(second);
    expect(result).to.not.contain(first);
  });
});
