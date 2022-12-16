import {
  KeyboardControl,
  Death,
  Combat,
  Pathfinding,
  Movement,
  Collision,
  Targetting,
  Travel,
  Shooting,
  Spawn,
} from "./systems/index.js";
import { Logger } from "./infra/logger.js";
import { FOVIndex } from "./fov-index.js";
import { HEIGHT, WIDTH } from "./config.js";
import { Terrain } from "./terrain/index.js";
import { Bus } from "./infra/bus.js";
import { EntityManager } from "./entities/entity-manager.js";
import { AreaManager } from "./AreaManager.js";
import { INPUTS } from "./input.js";
import { GlobalCoordinates } from "./GlobalCoordinates.js";

export class Game {
  private bus: Bus;
  private terrain: Terrain;
  private turn: number;
  private logger: Logger;
  private fov: FOVIndex;
  private entityManager: EntityManager;
  private areaManager: AreaManager;

  constructor(bus: Bus) {
    this.bus = bus;
    this.terrain = new Terrain(WIDTH, HEIGHT);
    this.turn = 0;
    this.logger = new Logger(bus);
    this.fov = new FOVIndex();
    this.entityManager = new EntityManager(this.bus, this.terrain);
    this.areaManager = new AreaManager(this.bus, this.terrain, this.entityManager);
    this.handleSubscriptions()
    this.fov.update(this.entityManager.getPlayer(), this.terrain);
  }

  handleSubscriptions() {
    this.entityManager.handleSubscriptions()
    this.areaManager.handleSubscriptions()
  }

  get entities() {
    return this.entityManager.getAllEntities();
  }

  get state() {
    return {
      fov: this.fov,
      terrain: this.terrain,
      player: this.entityManager.getPlayer(),
      turn: this.turn,
      entities: this.entities,
      coordinates: this.areaManager.getCurrentCoordinates()
    };
  }

  runMainLoop(action) {
    this.turn++;
    if (action.key === INPUTS.Click) {
      const { x, y } = action;
      Shooting.run(this.bus, this.logger, this.entities, x, y);
      Death.run(this.entities, this.entityManager);
    }
    KeyboardControl.run(this.entities, action);
    Travel.run(this.entities, this.bus);
    Movement.run(this.entities, this.terrain);
    this.fov.update(this.entityManager.getPlayer(), this.terrain);
    Targetting.run(this.entities, action);
    Pathfinding.run(this.entities, this.terrain);
    Collision.run(this.entities);
    Combat.run(this.bus, this.logger, this.entities);
    Death.run(this.entities, this.entityManager);
  }
}
