import { repeat } from "../util.js";
import { Anomaly } from "../entities/Anomaly.js";

export class AnomalySpawner {
  static spawn(quantity = 1) {
    const result = [];

    repeat(quantity, () => {
      result.push(new Anomaly());
    });

    return result;
  }
}
