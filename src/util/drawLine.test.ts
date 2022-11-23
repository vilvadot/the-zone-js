import { describe, expect, it } from "vitest";
import { Point } from "../data-structures/Point";
import { drawLine } from "./drawLine";

describe("drawLine", () => {
  it("draws a line between two straight points", () => {
    const start = new Point(0, 0);
    const end = new Point(0, 6);

    const line = drawLine(start, end);

    expect(line).toEqual([start, new Point(0, 2), new Point(0, 4), end]);
  });

  it("steps can be forced", () => {
    const start = new Point(0, 0);
    const end = new Point(0, 20);

    const line = drawLine(start, end, 2);

    expect(line).toEqual([start, new Point(0, 10), end]);
  });
});
