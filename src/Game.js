import {
  KeyboardControl,
  Rendering,
  Death,
  Combat,
  Spawn,
  Pathfinding,
  Movement,
  Collision,
  Targetting,
  Animation,
  WorldRendering,
  Travel,
} from "./systems/index.js";
import { UIRendering } from "./ui/system.js";
import { Corpse, Player } from "./entities/index.js";
import { Logger } from "./Logger.js";
import { FOVIndex } from "./fov-index.js";
import { EnemySpawner } from "./spawners/EnemySpawner.js";
import { ArtifactSpawner } from "./spawners/ArtifactSpawner.js";
import { LIMIT } from "./config.js";
import { findTile } from "./util.js";

class EntityManager {
  constructor(entitites = []) {
    this.entities = entitites;
  }

  add(entities) {
    if (Array.isArray(entities)) return this.entities = [...this.entities, ...entities];

    this.entities.push(entities);
  }

  kill(entity){
    this.entities = this.entities.filter(({ id }) => id !== entity.id);
    this.entities.push(new Corpse(entity));
  }

  resetAllButPlayer(){
    this.entities.forEach((entity) => {
      if (entity) findTile(entity?.id)?.remove(); // Responsabilidad de rendering
    });
  }

  retrieveAll() {
    return this.entities;
  }
}

export class Game {
  constructor(bus, display, world) {
    this.bus = bus;
    this.display = display;
    this.world = world;
    this.player = new Player();
    this.turn = 0;
    this.ui = new UIRendering(bus);
    this.logger = new Logger(bus);
    this.fov = new FOVIndex();
    this.entityManager = new EntityManager();
    this.entityManager.add(this.player);
    this.createNewArea();
  }

  createNewArea() {
    this.display.clear();
    this.entityManager.resetAllButPlayer()

    const enemies = EnemySpawner.spawn(LIMIT.enemies);
    this.entityManager.add(enemies);

    const anomalies = ArtifactSpawner.spawn(LIMIT.anomalies);
    this.entityManager.add(anomalies);

    this.world.generate();

    Spawn.run(this.entityManager.retrieveAll(), this.world);
  }

  runMainLoop(action) {
    const entities = this.entityManager.retrieveAll();

    this.ui.update(entities, this.player, this.turn);
    KeyboardControl.run(entities, action);
    Travel.run(entities, this.world, () => {
      this.createNewArea();
    });
    Movement.run(entities, this.world);
    this.fov.update(this.player, this.world);
    Targetting.run(entities, action);
    Pathfinding.run(entities, this.world);
    Collision.run(entities);
    Combat.run(this.bus, this.logger, entities);
    Animation.run(entities);
    Death.run(entities, this.entityManager);
    WorldRendering.run(this.display, this.fov, this.world);
    Rendering.run(entities, this.fov);
  }
}
