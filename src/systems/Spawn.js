export class Spawn {
  static run(entities, world) {
    for (const { position } of entities) {
      if (!position) continue;
      if (position.x && position.y) continue;

      const coordinates = world.getRandomFreeCell();

      position.x = coordinates.x;
      position.y = coordinates.y;
    }
  }
}
