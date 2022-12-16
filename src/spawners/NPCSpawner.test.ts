import { describe, expect, it } from "vitest";
import { NPCSpawner } from "./NPCSpawner.js";

describe("NPCSpawner", () => {
  it("spawns a merchant", () => {
    const seed = "12";
    const enemies = NPCSpawner.spawn();

    expect(enemies[0].name).toEqual("merchant");
  });
});
