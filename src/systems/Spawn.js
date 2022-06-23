export class Spawn {
  static run(entities, world) {
    for (const { spawn, position } of entities) {
      if (!spawn || !position) continue;

      let coordinates = { x: 0, y: 0 };

      if (spawn.isRandom()) coordinates = world.getRandomFreeCell();

      position.x = coordinates.x;
      position.y = coordinates.y;
    }
  }
}