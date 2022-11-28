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

    constructor(terrain: Terrain, entityManager: EntityManager, bus: Bus) {
        this.terrain = terrain;
        this.bus = bus;
        this.entityManager = entityManager;
        this.coordinates = new GlobalCoordinates();
        this.createNewArea();
    }

    createNewArea() {
        const coordinates = this.coordinates.retrieve()
        const seed = this.coordinates.getAreaSeed()
        this.terrain.generate(seed);
        this.bus.emit(EVENTS.AREA_CREATED, { coordinates })
    }

    getCoordinates() {
        return this.coordinates.retrieve();
    }

    travelWest() {
        this.coordinates.moveWest();
        this.createNewArea();
    }

    travelEast() {
        this.coordinates.moveEast();
        this.createNewArea();
    }

    travelNorth() {
        this.coordinates.moveNorth();
        this.createNewArea();
    }

    travelSouth() {
        this.coordinates.moveSouth();
        this.createNewArea();
    }

    handleSubscriptions() {
        this.bus.subscribe(EVENTS.TRAVELED, ({ direction }) => {
            if (direction === "north") this.travelNorth()
            if (direction === "east") this.travelEast()
            if (direction === "west") this.travelWest()
            if (direction === "south") this.travelSouth()
        })
    }
}
