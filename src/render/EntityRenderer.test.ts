import { describe, expect, it, afterEach } from 'vitest'
import { EntityRenderer } from "./EntityRenderer.js";
import { FOVIndex } from "../fov-index.js";
import { Position, Sprite } from "../components/index.js";
import { canvasCoordinates } from "../util.js";

describe("EntityRenderer", () => {
  let sprite;

  afterEach(() => {
    sprite.remove();
  });

  it("draws a sprite in its position", () => {
    stubTerrainDOM();
    const id = "yEntity";
    const x = 10;
    const y = 10;
    const centeredEntity = new EntityAt(id, x, y);

    EntityRenderer.run([centeredEntity], new FOVIndex());

    sprite = document.querySelector(`#${id}`);
    expect(sprite.title).toEqual(id);
    expect(sprite.getAttribute("style")).toContain(
      `top: ${canvasCoordinates(x)}px`
    );
    expect(sprite.getAttribute("style")).toContain(
      `left: ${canvasCoordinates(y)}px;`
    );
  });
});

const stubTerrainDOM = () => {
  const $game = document.createElement("div");
  $game.id = "game";
  document.body.appendChild($game);
};

class EntityAt {
  id: any;
  name: string;
  position: Position;
  sprite: Sprite;

  constructor(id, x, y) {
    this.id = id;
    this.name = "entityName";
    this.position = new Position(x, y);
    this.sprite = new Sprite();
  }
}
