import { Anomaly } from "../entities/Anomaly.js";
import ROT from "../lib/rot.js";
import { randomFloat } from "../util/random.js";


export class AnomalySpawner {
  static spawn() {
    const result: Anomaly[] = [];
    const filled = randomFloat(0, .45)

    new ROT.Map.Cellular()
      .randomize(filled)
      .create((x: number, y: number, isFilled: boolean) => {
        console.log(isFilled)
        if (!isFilled) return

        result.push(new Anomaly(x, y));
      });

    return result;
  }
}
