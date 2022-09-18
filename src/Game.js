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
import { HEIGHT, WIDTH, LIMIT } from "./config.js";
import { World } from "./World/index.js";
import { EntityManager } from "./entity-manager.js";
import { Navigation } from "./navigation.js";

export class Game {
  constructor(bus, display) {
    this.bus = bus;
    this.display = display;
    this.navigation = new Navigation();
    this.world = new World(WIDTH, HEIGHT);
    this.player = new Player();
    this.turn = 0;
    this.ui = new UIRendering(bus);
    this.logger = new Logger(bus);
    this.fov = new FOVIndex();
    this.entityManager = new EntityManager();
    this.entityManager.addPlayer(this.player);
    this.createNewArea();
  }

  createNewArea() {
    const coordinates = this.navigation.getAreaCoordinates();
    let cachedEntities = this.entityManager.isCached(coordinates);

    if (!cachedEntities) {
      const enemies = EnemySpawner.spawn(LIMIT.enemies);
      const anomalies = ArtifactSpawner.spawn(LIMIT.anomalies);
      this.entityManager.add([...enemies, ...anomalies])
    }

    this.world.generate(coordinates);

    Spawn.run(this.entityManager.retrieveAll(coordinates), this.world);
  }

  runMainLoop(action) {
    this.turn++;
    KeyboardControl.run(this.entityManager.retrieveAll(), action);
    Travel.run(this.entityManager.retrieveAll(), this.navigation, this.entityManager, () => {
      this.createNewArea();
    });
    Movement.run(this.entityManager.retrieveAll(), this.world);
    this.fov.update(this.player, this.world);
    Targetting.run(this.entityManager.retrieveAll(), action);
    Pathfinding.run(this.entityManager.retrieveAll(), this.world);
    Collision.run(this.entityManager.retrieveAll());
    Combat.run(this.bus, this.logger, this.entityManager.retrieveAll());
    Animation.run(this.entityManager.retrieveAll());
    Death.run(this.entityManager.retrieveAll(), this.entityManager);
    WorldRendering.run(this.display, this.fov, this.world);
    Rendering.run(this.entityManager.retrieveAll(), this.fov);
    this.ui.update(this.entityManager.retrieveAll(), this.turn);
  }
}
