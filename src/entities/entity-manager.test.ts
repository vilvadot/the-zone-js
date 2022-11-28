import { describe, expect, it } from "vitest";
import entities from ".";
import { EVENTS } from "../events";
import { Bus } from "../infra/bus";
import { Coordinates } from "../Navigation";
import { Terrain } from "../terrain";
import { Enemy } from "./enemies/Enemy";
import { EntityManager } from "./entity-manager";

describe("EntityManager", () => {
    const bus = new Bus()
    const terrain = new Terrain(10, 10)

    it("enemies spawn", () => {
        const entityManager = new EntityManager(bus, terrain)
        entityManager.handleSubscriptions()

        bus.emit(EVENTS.AREA_CREATED, { coordinates: new Coordinates(1, 1) })

        const entitites = entityManager.retrieveAll()
        const enemy = entitites.find(entity => entity instanceof Enemy)
        expect(enemy).toBeDefined()
    });
})