import {
  KeyboardControl,
  Death,
  Combat,
  Spawn,
  Pathfinding,
  Movement,
  Collision,
  Targetting,
  Animation,
  Travel,
} from "./systems/index.js";
import { EntityManager, Player } from "./entities/index.js";
import { Logger } from "./infra/logger.js";
import { FOVIndex } from "./fov-index.js";
import { EnemySpawner } from "./spawners/EnemySpawner.js";
import { ArtifactSpawner } from "./spawners/ArtifactSpawner.js";
import { HEIGHT, WIDTH, LIMIT } from "./config.js";
import { World } from "./world/index.js";
import { Navigation } from "./navigation.js";

export class Game {
  constructor(bus) {
    this.bus = bus;
    this.navigation = new Navigation();
    this.world = new World(WIDTH, HEIGHT);
    this.player = new Player();
    this.turn = 0;
    this.logger = new Logger(bus);
    this.fov = new FOVIndex();
    this.entityManager = new EntityManager();
    this.entityManager.addPlayer(this.player);
    this.createNewArea();
  }

  get entities() {
    return this.entityManager.retrieveAll();
  }

  createNewArea() {
    const coordinates = this.navigation.getAreaCoordinates();
    let cachedEntities = this.entityManager.isCached(coordinates);

    if (!cachedEntities) {
      const enemies = EnemySpawner.spawn(LIMIT.enemies);
      const anomalies = ArtifactSpawner.spawn(LIMIT.anomalies);
      this.entityManager.add([...enemies, ...anomalies]);
    }

    this.world.generate(this.navigation.getAreaSeed());

    Spawn.run(this.entityManager.retrieveAll(coordinates), this.world);
  }

  runMainLoop(action) {
    this.turn++;
    KeyboardControl.run(this.entities, action);
    Travel.run(this.entities, this.navigation, this.entityManager, () => {
      this.createNewArea();
    });
    Movement.run(this.entities, this.world);
    this.fov.update(this.player, this.world);
    Targetting.run(this.entities, action);
    Pathfinding.run(this.entities, this.world);
    Collision.run(this.entities);
    Combat.run(this.bus, this.logger, this.entities);
    Animation.run(this.entities);
    Death.run(this.entities, this.entityManager);

    return {
      fov: this.fov,
      world: this.world,
      turn: this.turn,
      entities: this.entityManager.retrieveAll(),
    };
  }
}
