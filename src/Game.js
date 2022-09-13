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
    this.entities = [this.player];
    this.createNewArea();
  }

  createNewArea() {
    this.display.clear();
    const enemies = EnemySpawner.spawn(LIMIT.enemies);
    const anomalies = ArtifactSpawner.spawn(LIMIT.anomalies);

    this.world.generate();
    this.entities = [this.player, ...enemies, ...anomalies];
    Spawn.run(this.entities, this.world);
  }

  runMainLoop(action) {
    console.log(this.turn)
    this.ui.update(this.entities, this.player, this.turn);
    KeyboardControl.run(this.entities, action);
    Travel.run(this.entities, this.world, () => {
      this._clearEntities()
      this.createNewArea()
    });
    Movement.run(this.entities, this.world);
    this.fov.update(this.player, this.world);
    Targetting.run(this.entities, action);
    Pathfinding.run(this.entities, this.world);
    Collision.run(this.entities);
    Combat.run(this.bus, this.logger, this.entities);
    Animation.run(this.entities);
    Death.run(this.entities, this); // TODO: Is there a better way of killing stuff?
    WorldRendering.run(this.display, this.fov, this.world);
    Rendering.run(this.entities, this.fov);
  }

  reset() {
    window.location.reload();
  }

  kill(entity) {
    this.entities = this.entities.filter(({ id }) => id !== entity.id);
    this.entities.push(new Corpse(entity));
  }

  _clearEntities() {
    this.entities.forEach((entity) => {
      if (entity) findTile(entity.id).remove();
    });
  }
}
