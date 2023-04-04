import { Coordinate } from "../Coordinate.js";
import { pickRandom, randomInteger } from "../util/random.js";

type MultidimensionalMatrix = any[][];

export class Matrix {
  data: MultidimensionalMatrix;

  constructor(rows = 1, columns = 1) {
    const emptyColumn = [...Array(columns).fill(null)];
    this.data = [...Array(rows).fill(emptyColumn)];
  }

  get columns() {
    return this.data[0].length;
  }

  get rows() {
    return this.data.length;
  }

  setValue(x: number, y: number, value: any) {
    const intX = Math.floor(x);
    const intY = Math.floor(y);
    if (!this.data[intX]) this.data[intX] = [];
    this.data[intX][intY] = value;
    return this;
  }

  getValue(x: number, y: number) {
    if (!this.data[x]) return;
    return this.data[x][y];
  }

  getBorder(width = 1): Matrix {
    const result = new Matrix();

    this.iterate((x: number, y: number, value: any) => {
      const isLeftBorder = x < width;
      const isTopBorder = y < width;
      const isRightBorder = x > this.rows - 1 - width;
      const isBottomBorder = y > this.columns - 1 - width;

      if (isLeftBorder || isRightBorder || isTopBorder || isBottomBorder)
        return result.setValue(x, y, value);
    });

    return result;
  }

  merge(matrix: Matrix) {
    matrix.iterate((x: number, y: number, value: any) => {
      this.setValue(x, y, value);
    });
    return this;
  }

  mergeAt(matrix: Matrix, [startX, startY]: Coordinate) {
    this.iterate((x: number, y: number) => {
      if (x < startX) return;
      if (x > startX + matrix.rows - 1) return;
      if (y < startY) return;
      if (y > startY + matrix.columns - 1) return;

      const value = matrix.getValue(x - startX, y - startY);
      this.setValue(x, y, value);
    });

    return this;
  }

  iterate(callback: IteratorCallback) {
    this.data.forEach((row, x) => {
      row.forEach((element, y) => {
        callback(x, y, element);
      });
    });
  }
}

type IteratorCallback = (x: number, y: number, element: any) => void;
