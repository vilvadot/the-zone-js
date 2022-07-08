import { Animation as AnimationSystem, ANIMATIONS } from "./Animation";
import { Animation, Sprite } from "../components";

describe("Animation system", () => {
  let sprite;

  afterEach(() => {
    sprite.remove();
  });

  it("adds the current animation class", () => {
    const entityId = 'myentity'
    const animatedEntity = new Entity(entityId);
    animatedEntity.animation.name = ANIMATIONS.hit.name
    animatedEntity.animation.isActive = true

    AnimationSystem.run([animatedEntity]);

    sprite = document.querySelector(`#${entityId}`);
    expect(sprite.className).toEqual('animation--hit');
  });

  it("removes the animation class after animation finishes", () => {
    jest.useFakeTimers();
    const entityId = 'myentity'
    const animatedEntity = new Entity(entityId);
    animatedEntity.animation.name = ANIMATIONS.hit.name
    animatedEntity.animation.isActive = true

    AnimationSystem.run([animatedEntity]);

    jest.runAllTimers();
    sprite = document.querySelector(`#${entityId}`);
    expect(sprite.className).not.toEqual('animation--hit');
  });
});

const addNode = (id) => {
  const $node = document.createElement("div");
  $node.id = id;

  document.body.appendChild($node)

  return $node
};

class Entity {
  constructor(id) {
    this.id = id;
    const node = addNode(id)
    this.sprite = new Sprite(id, 'X');
    this.sprite.node = node
    this.animation = new Animation();
  }
}
