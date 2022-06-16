import { TILES } from "../config.js"

export class Grid {
  constructor(columns = 0, rows = 0) {
    this.width = columns
    this.height = rows
    this.map = preFillMatrixWithNulls(columns, rows)
  }

  getTile(x,y){
    if(!this.map[x]) return
    return this.map[x][y] 
  }

  add(y, x, value) {
    this.map[y][x] = value
    return this
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
      matrix[row][column] = TILES.empty;
    }
  }
  return matrix
}