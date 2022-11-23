import { describe, expect, it } from "vitest";
import { Point } from "../data-structures/Point";
import { drawLine } from "./drawLine";

describe("drawLine", () => {
  it("draws a line between two straight points", () => {
    const start = new Point(0, 0);
    const end = new Point(0, 2);

    const line = drawLine(start, end);
    console.log(line);

    expect(line).toEqual([start, new Point(0, 1), end]);
  });
});
