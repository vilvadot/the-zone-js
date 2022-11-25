import { Spawn } from "./systems/index.js";
import { EnemySpawner } from "./spawners/EnemySpawner.js";
import { ArtifactSpawner } from "./spawners/ArtifactSpawner.js";
import { LIMIT } from "./config.js";
import { Terrain } from "./terrain/index.js";
import { Navigation } from "./Navigation.js";
import { EntityManager } from "./entities/entity-manager.js";
import { Enemy } from "./entities/enemies/Enemy.js";

export class AreaManager {
    terrain: Terrain;
    entityManager: EntityManager;
    navigation: Navigation;

    constructor(terrain: Terrain, entityManager: EntityManager) {
        this.terrain = terrain;
        this.entityManager = entityManager;
        this.navigation = new Navigation();
        this.createNew();
    }

    createNew() {
        const coordinates = this.navigation.getAreaCoordinates();
        let cachedEntities = this.entityManager.isCached(coordinates);
        if (!cachedEntities) {
            let enemies: Enemy[] = [];
            if (coordinates !== "0,0") {
                enemies = EnemySpawner.spawn(LIMIT.enemies);
            }
            const anomalies = ArtifactSpawner.spawn(LIMIT.anomalies);
            this.entityManager.add([...enemies, ...anomalies]);
        }
        this.terrain.generate(this.navigation.getAreaSeed());
        Spawn.run(this.entityManager.retrieveAll(coordinates), this.terrain);
    }

    getCoordinates() {
        return this.navigation.getAreaCoordinates();
    }

    private resetCurrentArea() {
        this.entityManager.reset(this.getCoordinates());
    }

    travelWest() {
        this.resetCurrentArea();
        this.navigation.travelWest();
        this.createNew();
    }

    travelEast() {
        this.resetCurrentArea();
        this.navigation.travelEast();
        this.createNew();
    }

    travelNorth() {
        this.resetCurrentArea();
        this.navigation.travelNorth();
        this.createNew();
    }

    travelSouth() {
        this.resetCurrentArea();
        this.navigation.travelSouth();
        this.createNew();
    }
}
