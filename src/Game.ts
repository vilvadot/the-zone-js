import {
  KeyboardControl,
  Death,
  Combat,
  Pathfinding,
  Movement,
  Collision,
  Targetting,
  Trading,
  Travel,
  Shooting,
  AnomalyDiscovery,
} from "./systems/index.js";
import { Logger } from "./infra/logger.js";
import { FOVIndex } from "./fov-index.js";
import { HEIGHT, WIDTH } from "./config.js";
import { Terrain } from "./terrain/index.js";
import { Bus } from "./infra/bus.js";
import { EntityManager } from "./entities/entity-manager.js";
import { AreaManager } from "./AreaManager.js";
import { ACTION, ACTION_NAME } from "./actions.js";
import { Talk } from "./systems/Talk.js";
import { GameMode, Mode } from "./GameMode.js";
import { Pickup } from "./systems/Pickup.js";
import { Entities } from "./entities/index.js";
import { GlobalCoordinates } from "./GlobalCoordinates.js";
import { Player } from "./entities/Player.js";
import { UseItem } from "./systems/UseItem.js";

export interface GameState {
  fov: FOVIndex;
  terrain: Terrain;
  player: Player;
  turn: number;
  entities: Entities;
  mode: GameMode;
  coordinates: GlobalCoordinates;
}

export class Game {
  private bus: Bus;
  private terrain: Terrain;
  private turn: number;
  private logger: Logger;
  private fov: FOVIndex;
  private entityManager: EntityManager;
  private areaManager: AreaManager;
  private mode: GameMode;
  private coordinates: GlobalCoordinates;

  constructor(bus: Bus) {
    this.turn = 0;
    this.bus = bus;
    this.terrain = new Terrain(WIDTH, HEIGHT);
    this.logger = new Logger(bus);
    this.mode = new GameMode();
    this.coordinates = new GlobalCoordinates();
    this.entityManager = new EntityManager(this.bus, this.coordinates);
    this.areaManager = new AreaManager(this.bus, this.terrain, this.coordinates);
    this.fov = new FOVIndex(this.player, this.terrain);

    this.handleSubscriptions();
  }

  handleSubscriptions() {
    this.entityManager.handleSubscriptions();
    this.areaManager.handleSubscriptions();
  }

  get entities() {
    return this.entityManager.getAllEntities();
  }

  get player(){
    return this.entityManager.getPlayer();
  }

  get state(): GameState {
    return {
      fov: this.fov,
      terrain: this.terrain,
      player: this.player,
      turn: this.turn,
      entities: this.entities,
      mode: this.mode,
      coordinates: this.coordinates,
    };
  }

  runMainLoop(action: ACTION) {
    if (action.name === ACTION_NAME.TARGET && this.mode.name !== Mode.aiming)
      return;

    Talk.run(action, this.entities, this.mode);
    Trading.run(action, this.logger);
    UseItem.run(action, this.logger, this.entities);
    KeyboardControl.run(action, this.entities, this.mode, this.logger);

    if (this.mode.isDialog()) return;

    if (this.mode.name === Mode.aiming) {
      Shooting.run(action, this.bus, this.logger, this.entities);
    }
    Pathfinding.run(this.entities, this.terrain);
    Pickup.run(action, this.entities, this.entityManager, this.logger);
    Travel.run(this.entities, this.bus);
    Movement.run(this.entities, this.terrain);
    this.fov.update(this.player, this.terrain);
    Targetting.run(this.entities, action);
    Collision.run(this.entities);
    Combat.run(this.bus, this.logger, this.entities);
    AnomalyDiscovery.run(this.entities);
    Death.run(this.entities, this.entityManager);
    this.turn++;
  }
}
