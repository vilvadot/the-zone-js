import { Spawn } from "./systems/index.js";
import { EnemySpawner } from "./spawners/EnemySpawner.js";
import { ArtifactSpawner } from "./spawners/ArtifactSpawner.js";
import { LIMIT } from "./config.js";
import { Terrain } from "./terrain/index.js";
import { GlobalCoordinates } from "./Navigation.js";
import { EntityManager } from "./entities/entity-manager.js";
import { ENEMY, Enemy } from "./entities/enemies/Enemy.js";
import { Bus } from "./infra/bus.js";
import { EVENTS } from "./events.js";

export class AreaManager {
    terrain: Terrain;
    bus: Bus;
    entityManager: EntityManager;
    coordinates: GlobalCoordinates;

    constructor(bus: Bus, terrain: Terrain, entityManager: EntityManager, coordinates: GlobalCoordinates,) {
        this.bus = bus;
        this.terrain = terrain;
        this.entityManager = entityManager;
        this.coordinates = coordinates;
        this.createNewArea();
    }

    createNewArea() {
        const coordinates = this.coordinates.retrieve()
        const seed = this.coordinates.getAreaSeed()
        this.terrain.generate(seed);
        this.bus.emit(EVENTS.AREA_CREATED, { coordinates })
    }

    handleSubscriptions() {
        this.bus.subscribe(EVENTS.TRAVELED, ({ direction }) => {
            if (direction === "north") this.coordinates.moveNorth()
            if (direction === "east") this.coordinates.moveEast()
            if (direction === "west") this.coordinates.moveWest()
            if (direction === "south") this.coordinates.moveSouth()

            this.createNewArea();
        })
    }
}
