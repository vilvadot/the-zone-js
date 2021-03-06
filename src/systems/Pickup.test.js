import { Pickup } from "./Pickup";
import { Collision, Inventory, Pickable, Sprite, Animation } from "../components";
import { Logger } from "../Logger.stub";
import { INPUTS } from "../input";

describe("Pickup system", () => {
  it("player picks a pickable item in the same tile", () => {
    const itemId = "anItem";
    const item = new PickableEntity(itemId);
    const picker = new Picker("player", { overlap: [itemId] });
    const action = { key: INPUTS.KeyE };

    Pickup.run(Logger(), [picker, item], action);

    expect(picker.inventory.content[0].id).toEqual(itemId);
    expect(item.pickable.isPicked).toBe(true);
    expect(item.sprite.isHidden).toBe(true);
  });

  it("does not pick an item on a different tile", () => {
    const itemId = "anItem";
    const item = new PickableEntity(itemId);
    const picker = new Picker("player", { overlap: [] });
    const action = { key: INPUTS.KeyE };

    Pickup.run(Logger(), [picker, item], action);

    expect(picker.inventory.content).toEqual([]);
    expect(item.pickable.isPicked).toBe(false);
  });

  it("does not pick a non pickable item", () => {
    const itemId = "anItem";
    const item = new NonPickableEntity(itemId);
    const picker = new Picker("player", { overlap: [itemId] });
    const action = { key: INPUTS.KeyE };

    Pickup.run(Logger(), [picker, item], action);

    expect(picker.inventory.content).toEqual([]);
  });

  it("does not pick an already picked item", () => {
    const itemId = "anItem";
    const item = new PickableEntity(itemId);
    item.pickable.isPicked = true;
    const picker = new Picker("player", { overlap: [itemId] });
    const action = { key: INPUTS.KeyE };

    Pickup.run(Logger(), [picker, item], action);

    expect(picker.inventory.content).not.toContain(itemId);
  });
});

class Picker {
  constructor(id, collisionAreas) {
    this.id = id;
    this.collision = new Collision(collisionAreas);
    this.inventory = new Inventory();
    this.pickable = new Pickable();
  }
}

class PickableEntity {
  constructor(id) {
    this.id = id;
    this.pickable = new Pickable();
    this.sprite = new Sprite();
    this.animation = new Animation();
  }
}

class NonPickableEntity {
  constructor(id) {
    this.id = id;
  }
}
