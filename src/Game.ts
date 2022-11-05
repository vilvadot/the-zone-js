import {
  KeyboardControl,
  Death,
  Combat,
  Pathfinding,
  Movement,
  Collision,
  Targetting,
  Travel,
  Shooting
} from "./systems/index.js";
import { Logger } from "./infra/logger.js";
import { FOVIndex } from "./fov-index.js";
import { HEIGHT, WIDTH } from "./config.js";
import { Terrain } from "./terrain/index.js";
import { Bus } from "./infra/bus.js";
import { EntityManager } from "./entities/entity-manager.js";
import { Player } from "./entities/Player.js";
import { AreaManager } from "./AreaManager.js";
import { INPUTS } from "./input.js";

export const BULLET_DAMAGE = 3;

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
      const { x, y } = action;
      Shooting.run(this.logger, this.entities, x, y);
      Death.run(this.entities, this.entityManager);
    }
    KeyboardControl.run(this.entities, action);
    Travel.run(this.entities, this.areaManager);
    Movement.run(this.entities, this.terrain);
    this.fov.update(this.player, this.terrain);
    Targetting.run(this.entities, action);
    Pathfinding.run(this.entities, this.terrain);
    Collision.run(this.entities);
    Combat.run(this.bus, this.logger, this.entities);
    this.turn++;
    Death.run(this.entities, this.entityManager);
  }
}
