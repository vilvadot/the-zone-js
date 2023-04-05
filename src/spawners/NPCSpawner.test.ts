import { describe, expect, it } from "vitest";
import { NPCSpawner } from "./NPCSpawner.js";

describe("NPCSpawner", () => {
  it("spawns a merchant", () => {
    const enemies = new NPCSpawner().spawn();

    expect(enemies[0].name).toEqual("merchant");
  });
});
