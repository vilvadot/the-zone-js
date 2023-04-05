import { beforeEach, describe, expect, it, vi } from "vitest";
import { Entities } from ".";
import { EVENTS } from "../actions";
import { Bus } from "../infra/bus";
import { GlobalCoordinates } from "../GlobalCoordinates";
import { Terrain } from "../terrain";
import {
  fakeChanceAlwaysHappens,
  fakeChanceNeverHappens,
} from "../util/Chance.testUtils";
import { Artifact } from "./Artifact";
import { Enemy } from "./enemies/Enemy";
import { EntityManager } from "./entity-manager";
import { Merchant } from "./Merchant";
import { Player } from "./Player";

describe("EntityManager", () => {
  const bus = new Bus();
  const terrain = new Terrain(10, 10);
  let entityManager;
  let coordinates;

  beforeEach(() => {
    coordinates = new GlobalCoordinates(1, 1);
    entityManager = new EntityManager(
      bus,
      terrain,
      coordinates
    );
    entityManager.handleSubscriptions();
    vi.clearAllMocks();
  });

  it("spawns a merchant in home area", () => {
    const homeCoordinates = new GlobalCoordinates(0, 0);
    const manager = new EntityManager(
      bus,
      terrain,
      homeCoordinates
    );
    manager.handleSubscriptions();

    bus.emit(EVENTS.AREA_CREATED);

    const entities = manager.getAllEntities();
    expect(entities).toHaveLength(2);
    expect(findEntity(entities, Merchant)).toBeDefined();
    expect(findEntity(entities, Player)).toBeDefined();
  });

  it("spawns enemies when area is created", () => {
    fakeChanceAlwaysHappens();

    
    bus.emit(EVENTS.AREA_CREATED);

    const entities = entityManager.getAllEntities();
    expect(findEntity(entities, Enemy)).toBeDefined();
  });

  it("recovers entities from cache", () => {
    fakeChanceAlwaysHappens();

    coordinates.x = 1;
    coordinates.y = 1;
    bus.emit(EVENTS.AREA_CREATED);
    const initialEntities = entityManager.getAllEntities();

    coordinates.x = 0;
    coordinates.y = 0;
    bus.emit(EVENTS.AREA_CREATED);
    const secondAreaEntities = entityManager.getAllEntities();
    expect(secondAreaEntities).not.toEqual(initialEntities);

    coordinates.x = 1;
    coordinates.y = 1;
    bus.emit(EVENTS.AREA_CREATED);
    const initialEntitiesAgain = entityManager.getAllEntities();

    expect(initialEntitiesAgain).toEqual(initialEntities);
  });

  it("spawns artifacts when area is created", () => {
    fakeChanceAlwaysHappens();

    bus.emit(EVENTS.AREA_CREATED);

    const entities = entityManager.getAllEntities();
    expect(findEntity(entities, Artifact)).toBeDefined();
  });

  it("sometimes does not spawn artifacts", () => {
    fakeChanceNeverHappens();

    bus.emit(EVENTS.AREA_CREATED);

    const entities = entityManager.getAllEntities();
    expect(findEntity(entities, Artifact)).toBeUndefined();
  });
});

const findEntity = (entities: Entities, Class) => {
  return entities.find((entity) => entity instanceof Class);
};
