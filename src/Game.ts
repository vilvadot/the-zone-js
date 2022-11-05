import {
  KeyboardControl,
  Death,
  Combat,
  Pathfinding,
  Movement,
  Collision,
  Targetting,
  Travel,
} from "./systems/index.js";
import { Logger } from "./infra/logger.js";
import { FOVIndex } from "./fov-index.js";
import { HEIGHT, WIDTH } from "./config.js";
import { Terrain } from "./terrain/index.js";
import { Bus } from "./infra/bus.js";
import { EntityManager } from "./entities/entity-manager.js";
import { Player } from "./entities/Player.js";
import { AreaManager } from "./AreaManager.js";
import { EVENTS } from "./events.js";
import { INPUTS } from "./input.js";
import { ANIMATIONS } from "./animations.js";

const BULLET_DAMAGE = 3;

export class Shooting {
  static run(logger, entities, targetId) {
    for (const entity of entities) {
      if (entity.id !== targetId || targetId === "player") continue;
      console.log('here!', targetId)
      entity.health.value -= BULLET_DAMAGE;
      entity.animation.name = ANIMATIONS.hit.name;
      entity.animation.isActive = true;

      logger.log(
        `"player" shot at "${entity.name}" for ${BULLET_DAMAGE} damage!`,
        "blue"
      );
    }
  }
}

export class Game {
  bus: Bus;
  terrain: Terrain;
  player: Player;
  turn: number;
  logger: Logger;
  fov: FOVIndex;
  entityManager: EntityManager;
  areaManager: AreaManager;

  constructor(bus: Bus) {
    this.bus = bus;
    this.terrain = new Terrain(WIDTH, HEIGHT);
    this.player = new Player();
    this.turn = 0;
    this.logger = new Logger(bus);
    this.fov = new FOVIndex();
    this.entityManager = new EntityManager();
    this.entityManager.addPlayer(this.player);
    this.areaManager = new AreaManager(this.terrain, this.entityManager);
    this.fov.update(this.player, this.terrain);
  }

  get entities() {
    return this.entityManager.retrieveAll();
  }

  get state() {
    return {
      fov: this.fov,
      terrain: this.terrain,
      turn: this.turn,
      entities: this.entityManager.retrieveAll(),
      area: this.areaManager.getCoordinates(),
    };
  }

  runMainLoop(action?) {
    if (action?.key === INPUTS.Click) {
      Shooting.run(this.logger, this.entities, action.target);
      Death.run(this.entities, this.entityManager);
    }
    this.turn++;
    KeyboardControl.run(this.entities, action);
    Travel.run(this.entities, this.areaManager);
    Movement.run(this.entities, this.terrain);
    this.fov.update(this.player, this.terrain);
    Targetting.run(this.entities, action);
    Pathfinding.run(this.entities, this.terrain);
    Collision.run(this.entities);
    Combat.run(this.bus, this.logger, this.entities);
    Death.run(this.entities, this.entityManager);
  }
}
