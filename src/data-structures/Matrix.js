export class Matrix {
  constructor(rows = 1, columns = 1) {
    const emptyColumn = Array(columns).fill(null)
    this.data = Array(rows).fill(emptyColumn)
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
    return this.data[x][y];
  }
}