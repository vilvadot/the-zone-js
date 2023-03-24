import { randomInteger, repeat } from "../util/index.js";
import { HEIGHT, WIDTH } from "../config.js";
import { Anomaly } from "../entities/Anomaly.js";

export class AnomalySpawner {
  static spawn(quantity = 100) {
    const result: Anomaly[] = [];

    repeat(quantity, () => {
      const x = randomInteger(WIDTH, 0);
      const y = randomInteger(HEIGHT, 0);
      
      result.push(new Anomaly(x, y));
    });

    return result;
  }
}
