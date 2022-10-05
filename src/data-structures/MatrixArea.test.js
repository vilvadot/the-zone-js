import { MatrixArea } from "./MatrixArea";

describe("MatrixArea", () => {
  it("creates a Matrix from the start point to the end onde", () => {
    const start = [0,0]
    const end = [2,2]
    const someValue = 1

    const matrix = MatrixArea.from(start, end, someValue);

    expect(matrix.columns).toBe(3);
    expect(matrix.rows).toBe(3);
    expect(matrix.getValue(0,0)).toEqual(someValue)
    expect(matrix.getValue(2,2)).toEqual(someValue)
  });
});
