import { describe, expect, it } from "vitest";
import { Matrix } from "./Matrix.js";

describe("Matrix", () => {
  it("has a 1x1 dimension by default", () => {
    const matrix = new Matrix();

    expect(matrix.columns).toBe(1);
    expect(matrix.rows).toBe(1);
  });

  it("has an arbitrary dimension", () => {
    const matrix = new Matrix(2, 1);

    expect(matrix.rows).toBe(2);
    expect(matrix.columns).toBe(1);
  });

  it("sets values at arbitrary positions", () => {
    const matrix = new Matrix(1, 1);

    matrix.setValue(0, 3, "a");
    matrix.setValue(0, 2, "b");

    expect(matrix.getValue(0, 3)).toEqual("a");
    expect(matrix.getValue(0, 2)).toEqual("b");
  });

  it("extends matrix to match size where values are placed", () => {
    const matrix = new Matrix(1, 1);

    matrix.setValue(0, 3, "a");

    expect(matrix.getValue(0, 3)).toEqual("a");
    expect(matrix.rows).toEqual(1);
    expect(matrix.columns).toEqual(4);
  });

  it("returns undefined if value does not exist", () => {
    const matrix = new Matrix(1, 1);

    const result = matrix.getValue(3, 3);

    expect(result).toBeUndefined();
  });

  it("merges with other matrix", () => {
    const matrix = new Matrix(2, 2);
    const otherMatrix = new Matrix(2, 2);
    otherMatrix.setValue(2, 2, 1);

    const result = matrix.merge(otherMatrix);

    expect(result.getValue(2, 2)).toEqual(1);
  });

  it("provides its border of given size", () => {
    const matrix = new Matrix(3, 3);

    const result = matrix.getBorder();

    expect(result.getValue(1, 1)).toBeUndefined();
    expect(result.getValue(0, 0)).toEqual(null);
    expect(result.getValue(0, 1)).toEqual(null);
    expect(result.getValue(0, 2)).toEqual(null);
    expect(result.getValue(1, 0)).toEqual(null);
    expect(result.getValue(1, 2)).toEqual(null);
    expect(result.getValue(2, 2)).toEqual(null);
  });
});
