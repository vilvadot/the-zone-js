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
  AnomalyDiscovery
} from "./systems/index.js";
import { Logger } from "./infra/logger.js";
import { FOVIndex } from "./fov-index.js";
import { HEIGHT, WIDTH } from "./config.js";
import { Terrain } from "./terrain/index.js";
import { Bus } from "./infra/bus.js";
import { EntityManager } from "./entities/entity-manager.js";
import { AreaManager } from "./AreaManager.js";
import { KEYS } from "./input.js";
import { ACTION_EXECUTED_PAYLOAD, EVENTS, ITEM_TRANSFERED } from "./events.js";
import { Debug } from "./infra/debug.js";
import { Talk } from "./systems/Talk.js";
import { GameMode } from "./GameMode.js";
import { Pickup } from "./systems/Pickup.js";
import { Item } from "./entities/items/index.js";
import { Entities, Entity } from "./entities/index.js";
import { GlobalCoordinates } from "./GlobalCoordinates.js";
import { Player } from "./entities/Player.js";

class InventorySystem {
  bus: Bus;

  constructor(bus) {
    this.bus = bus;
  }

  handleSubscriptions() {
    this.bus.subscribe(EVENTS.ITEM_TRANSFERED, ({ item, from, to, quantity }: ITEM_TRANSFERED) => {
      const sourceItem = from.inventory.content.find(({ name }) => name === item.name) as Item
      if(sourceItem.quantity - quantity === 0 ){
        from.inventory.content.filter(({ id }) => id === item.id)
      } 

      const itemAlreadyInInventory = to.inventory.content.find(({ name }) => name === item.name)
      if (itemAlreadyInInventory) {
        itemAlreadyInInventory.quantity = itemAlreadyInInventory.quantity + quantity
      } else {
        to.inventory.content.push(item)
      }
    })
  }
}

export interface GameState {
  fov: FOVIndex,
  terrain: Terrain,
  player: Player,
  turn: number,
  entities: Entities,
  mode: GameMode,
  coordinates: GlobalCoordinates,
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
  private inventory: InventorySystem;

  constructor(bus: Bus) {
    this.bus = bus;
    this.terrain = new Terrain(WIDTH, HEIGHT);
    this.turn = 0;
    this.logger = new Logger(bus);
    this.fov = new FOVIndex();
    this.mode = new GameMode();
    this.entityManager = new EntityManager(this.bus, this.terrain);
    this.areaManager = new AreaManager(this.bus, this.terrain,);
    this.inventory = new InventorySystem(bus)
    this.handleSubscriptions();
    this.fov.update(this.entityManager.getPlayer(), this.terrain);
  }

  handleSubscriptions() {
    this.entityManager.handleSubscriptions();
    this.areaManager.handleSubscriptions();
    this.inventory.handleSubscriptions();
  }

  get entities() {
    return this.entityManager.getAllEntities();
  }

  get state(): GameState {
    return {
      fov: this.fov,
      terrain: this.terrain,
      player: this.entityManager.getPlayer(),
      turn: this.turn,
      entities: this.entities,
      mode: this.mode,
      coordinates: this.areaManager.getCurrentCoordinates(),
    };
  }

  runMainLoop(action: ACTION_EXECUTED_PAYLOAD) {
    this.turn++;
    if (action.key === KEYS.Space) {
      Debug.log(`Game mode toggled ${this.mode}`);
      Talk.run(this.entities, this.mode)
    }

    if (this.mode.isDialog()) return;

    if (action.key === KEYS.Click) {
      const { x, y } = action;
      Shooting.run(this.bus, this.logger, this.entities, x, y);
      Death.run(this.entities, this.entityManager);
    }

    Pickup.run(this.entities, action, this.entityManager)
    KeyboardControl.run(this.entities, action);
    Travel.run(this.entities, this.bus);
    Movement.run(this.entities, this.terrain);
    this.fov.update(this.entityManager.getPlayer(), this.terrain);
    Targetting.run(this.entities, action);
    Pathfinding.run(this.entities, this.terrain);
    Collision.run(this.entities);
    Combat.run(this.bus, this.logger, this.entities);
    AnomalyDiscovery.run(this.entities)
    Death.run(this.entities, this.entityManager);
  }
}
