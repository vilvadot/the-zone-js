import { KeyboardControl, Death, Combat, Spawn, Pathfinding, Movement, Collision, Targetting, Travel, } from "./systems/index.js";
import { Logger } from "./infra/logger.js";
import { FOVIndex } from "./fov-index.js";
import { EnemySpawner } from "./spawners/EnemySpawner.js";
import { ArtifactSpawner } from "./spawners/ArtifactSpawner.js";
import { HEIGHT, WIDTH, LIMIT } from "./config.js";
import { Terrain } from "./terrain/index.js";
import { Navigation } from "./Navigation.js";
import { Bus } from "./infra/bus.js";
import { EntityManager } from "./entities/entity-manager.js";
import { Player } from "./entities/Player.js";

export class Game {
  bus: Bus;
  navigation: Navigation;
  terrain: Terrain;
  player: Player;
  turn: number;
  logger: Logger;
  fov: FOVIndex;
  entityManager: EntityManager;

    constructor(bus: Bus) {
        this.bus = bus;
        this.navigation = new Navigation();
        this.terrain = new Terrain(WIDTH, HEIGHT);
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
        this.terrain.generate(this.navigation.getAreaSeed());
        Spawn.run(this.entityManager.retrieveAll(coordinates), this.terrain);
    }
    runMainLoop(action) {
        this.turn++;
        KeyboardControl.run(this.entities, action);
        Travel.run(this.entities, this.navigation, this.entityManager, () => {
            this.createNewArea();
        });
        Movement.run(this.entities, this.terrain);
        this.fov.update(this.player, this.terrain);
        Targetting.run(this.entities, action);
        Pathfinding.run(this.entities, this.terrain);
        Collision.run(this.entities);
        Combat.run(this.bus, this.logger, this.entities);
        Death.run(this.entities, this.entityManager);
        return {
            fov: this.fov,
            terrain: this.terrain,
            turn: this.turn,
            entities: this.entityManager.retrieveAll(),
        };
    }
}
