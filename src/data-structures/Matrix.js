import { TILES } from "../tiles.js";

export class Matrix {
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

  setValue(x, y, value) {
    if (!this.data[x]) this.data[x] = [];
    this.data[x][y] = value;
  }

  getValue(x, y) {
    if (!this.data[x]) return;
    return this.data[x][y];
  }

  getBorder(width = 1) {
    const result = new Matrix();

    this.iterate((x, y, value) => {
      const isLeftBorder = x < width;
      const isTopBorder = y < width;
      const isRightBorder = x > this.rows - 1 - width;
      const isBottomBorder = y > this.columns - 1 - width;

      if (isLeftBorder || isRightBorder || isTopBorder || isBottomBorder)
        return result.setValue(x, y, value);
    });

    return result;
  }

  merge(matrix) {
    matrix.iterate((x, y, value) => {
      this.setValue(x, y, value);
    });
    return this;
  }

   mergeAt(matrix, [startX, startY]) {
    this.iterate((x,y) => {
      if(x < startX) return
      if(x > startX + matrix.rows - 1) return
      if(y < startY) return
      if(y > startY + matrix.columns -1) return

      const value = matrix.getValue(x - startX, y - startY)
      this.setValue(x,y, value)
    })

    return this;
  }

  iterate(callback) {
    this.data.forEach((row, x) => {
      row.forEach((element, y) => {
        callback(x, y, element);
      });
    });
  }
}
