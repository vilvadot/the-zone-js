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
    this.navigation = new Navigation()
    this.world = new World(WIDTH, HEIGHT);
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
    this.entityManager.resetAllButPlayer();

    const enemies = EnemySpawner.spawn(LIMIT.enemies);
    this.entityManager.add(enemies);

    const anomalies = ArtifactSpawner.spawn(LIMIT.anomalies);
    this.entityManager.add(anomalies);

    const seed = this.navigation.getAreaCoordinates()
    this.world.generate(seed);

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
