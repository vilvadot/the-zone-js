import { Pickup } from "./Pickup";
import { Collision, Inventory, Sprite } from "../components";
import { INPUTS } from "../input";

describe("Pickup system", () => {
  it("player picks a pickable item in the same tile", () => {
    const itemId = "anItem";
    const item = new PickableEntity(itemId);
    const picker = new Picker("player", { overlap: [itemId] });
    const action = { key: INPUTS.KeyE };

    Pickup.run([picker, item], action);

    expect(picker.inventory.content).toContain(itemId);
    expect(item.isPicked).toBe(true);
    expect(item.sprite.isHidden).toBe(true);
  });

  it("does not pick an item on a different tile", () => {
    const itemId = "anItem";
    const item = new PickableEntity(itemId);
    const picker = new Picker("player", { overlap: [] });
    const action = { key: INPUTS.KeyE };

    Pickup.run([picker, item], action);

    expect(picker.inventory.content).not.toContain(itemId);
    expect(item.isPicked).toBe(false);
  });

  it("does not pick a non pickable item", () => {
    const itemId = "anItem";
    const item = new NonPickableEntity(itemId);
    const picker = new Picker("player", { overlap: [itemId] });
    const action = { key: INPUTS.KeyE };

    Pickup.run([picker, item], action);

    expect(picker.inventory.content).not.toContain(itemId);
    expect(item.isPicked).toBe(false);
  });

  it("does not pick an already picked item", () => {
    const itemId = "anItem";
    const item = new PickableEntity(itemId);
    item.isPicked = true;
    const picker = new Picker("player", { overlap: [itemId] });
    const action = { key: INPUTS.KeyE };

    Pickup.run([picker, item], action);

    expect(picker.inventory.content).not.toContain(itemId);
  });
});

class Picker {
  constructor(id, collisionAreas) {
    this.id = id;
    this.collision = new Collision(collisionAreas);
    this.inventory = new Inventory();
  }
}

class PickableEntity {
  constructor(id, x, y) {
    this.id = id;
    this.isPickable = true;
    this.isPicked = false;
    this.sprite = new Sprite();
  }
}

class NonPickableEntity {
  constructor(id, x, y) {
    this.id = id;
    this.isPickable = false;
    this.isPicked = false;
  }
}
