export class CellularGenerator {
  generate(result, fullness = 0.5, tileSelectorCallback) {
    this.engine.randomize(fullness).create((x, y, isFilled) => {
      const originalTile = result.getValue(x, y);
      const tile = tileSelectorCallback(isFilled, originalTile);
      result.setValue(x, y, tile);
    });
  }
}
