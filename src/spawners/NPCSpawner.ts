import { Merchant } from "../entities/Merchant.js";

export class NPCSpawner {
  spawn() {
    return [new Merchant(21, 4)];
  }
}
