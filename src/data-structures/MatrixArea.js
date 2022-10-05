import { Matrix } from "./Matrix.js";

export class MatrixArea {
  constructor(data) {
    this.data = data;
  }

  static from(start, end, fill) {
    const data = new Matrix();

    const columns = end[0] - start[0];
    const rows = end[1] - start[1];

    for (let i = 0; i <= columns; i++) {
      for (let j = 0; j <= rows; j++) {
        data.setValue(i, j, fill);
      }
    }

    return data;
  }
}
