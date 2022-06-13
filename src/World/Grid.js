export class Grid {
  constructor(width, height) {
    this.map = preFillMatrixWithNulls(width, height)
  }

  add(x, y, value) {
    this.map[x][y] = value
  }

  forEach(callback) {
    this.map.forEach((row, x) => {
      row.forEach((element, y) => {
        callback(x, y, element)
      });
    });
  }
}

const preFillMatrixWithNulls = (rows, columns) => {
  const matrix = []
  for (let row = 0; row < rows; row++) {
    matrix[row] = [];
    for (let column = 0; column < columns; column++) {
      matrix[row][column] = null;
    }
  }
  return matrix
}