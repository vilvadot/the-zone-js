import { Matrix } from "../../../data-structures/Matrix.js";
import ROT from "../../../lib/rot.js";

type TileSelectorCallback = (isFilled: boolean, originalTile: string) => void;

export class CellularGenerator {
  // @ts-ignore
  engine: ROT.Map.Cellular;

  generate(
    result: Matrix,
    fullness = 0.5,
    tileSelectorCallback: TileSelectorCallback
  ) {
    this.engine
      .randomize(fullness)
      .create((x: number, y: number, isFilled: boolean) => {
        const originalTile = result.getValue(x, y);
        const tile = tileSelectorCallback(isFilled, originalTile);
        result.setValue(x, y, tile);
      });
  }
}
