import { beforeEach, describe, expect, it, vi } from "vitest";
import { Entities } from ".";
import { EVENTS } from "../events";
import { Bus } from "../infra/bus";
import { Coordinates } from "../Navigation";
import { Terrain } from "../terrain";
import { fakeChanceAlwaysHappens, fakeChanceNeverHappens } from "../util/Chance.testUtils";
import { Artifact } from "./Artifact";
import { Enemy } from "./enemies/Enemy";
import { EntityManager } from "./entity-manager";

describe("EntityManager", () => {
    const bus = new Bus()
    const terrain = new Terrain(10, 10)
    let entityManager;

    beforeEach(() => {
        entityManager = entityManager = new EntityManager(bus, terrain)
        entityManager.handleSubscriptions()
        vi.clearAllMocks()
    })

    it("does not spawn entities on home area", () => {
        const homeCoordinates = new Coordinates(0, 0)

        bus.emit(EVENTS.AREA_CREATED, { coordinates: homeCoordinates })

        const entities = entityManager.retrieveAll()
        expect(entities).toHaveLength(1)
    });

    it("spawns enemies when area is created", () => {
        fakeChanceAlwaysHappens()

        bus.emit(EVENTS.AREA_CREATED, { coordinates: new Coordinates(1, 1) })

        const entities = entityManager.retrieveAll()
        expect(findEntity(entities, Enemy)).toBeDefined()
    });

    it("spawns artifacts when area is created", () => {
        fakeChanceAlwaysHappens()

        bus.emit(EVENTS.AREA_CREATED, { coordinates: new Coordinates(1, 1) })

        const entities = entityManager.retrieveAll()
        expect(findEntity(entities, Artifact)).toBeDefined()
    });

    it("sometimes does not spawn artifacts", () => {
        fakeChanceNeverHappens()

        bus.emit(EVENTS.AREA_CREATED, { coordinates: new Coordinates(1, 1) })

        const entities = entityManager.retrieveAll()
        expect(findEntity(entities, Artifact)).toBeUndefined()
    });
})



const findEntity = (entities: Entities, Class) => {
    return entities.find(entity => entity instanceof Class)
}