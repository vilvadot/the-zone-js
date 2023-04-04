import { Merchant } from "../entities/Merchant.js";

export class NPCSpawner {
  static spawn() {
    return [new Merchant(21, 4)];
  }
}
