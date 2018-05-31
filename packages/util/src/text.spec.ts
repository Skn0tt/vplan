import { BaseEntry } from "vplan-types";
import { secondaryText } from "./text";

describe("secondaryText", () => {
  const input: BaseEntry = {
    class: "E G5",
    day: Date.now(),
    from: 1,
    to: 2,
    teacher: "BES",
    group: "Q1",
    type: "Klausur",
    room: "A005",
    substituteTeacher: "HAR"
  };

  it("outputs the room", () => {
    expect(secondaryText(input)).toContain("@A005");
  });
});
