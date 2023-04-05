import { beforeEach, describe, expect, it, vi } from "vitest";
import { Entities } from ".";
import { EVENTS } from "../actions";
import { Bus } from "../infra/bus";
import { GlobalCoordinates } from "../GlobalCoordinates";
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
  let entityManager;
  let coordinates;

  beforeEach(() => {
    coordinates = new GlobalCoordinates(1, 1);
    entityManager = new EntityManager(coordinates);
  });

  it("spawns a merchant in home area", () => {
    const homeCoordinates = new GlobalCoordinates(0, 0);
    const manager = new EntityManager(homeCoordinates);

    const entities = manager.getAllEntities();
    expect(entities).toHaveLength(2);
    expect(findEntity(entities, Merchant)).toBeDefined();
    expect(findEntity(entities, Player)).toBeDefined();
  });

  it("spawns enemies when area is created", () => {
    fakeChanceAlwaysHappens();

    entityManager.spawnEntities()

    const entities = entityManager.getAllEntities();
    expect(findEntity(entities, Enemy)).toBeDefined();
  });

  it("recovers entities from cache", () => {
    fakeChanceAlwaysHappens();

    coordinates.x = 1;
    coordinates.y = 1;
    entityManager.spawnEntities()
    const initialEntities = entityManager.getAllEntities();

    coordinates.x = 0;
    coordinates.y = 0;
    entityManager.spawnEntities()
    const secondAreaEntities = entityManager.getAllEntities();
    expect(secondAreaEntities).not.toEqual(initialEntities);

    coordinates.x = 1;
    coordinates.y = 1;
    entityManager.spawnEntities()
    const initialEntitiesAgain = entityManager.getAllEntities();

    expect(initialEntitiesAgain).toEqual(initialEntities);
  });

  it("spawns artifacts when area is created", () => {
    fakeChanceAlwaysHappens();

    entityManager.spawnEntities()

    const entities = entityManager.getAllEntities();
    expect(findEntity(entities, Artifact)).toBeDefined();
  });

  it.only("sometimes does not spawn artifacts", () => {
    fakeChanceNeverHappens();

    entityManager.spawnEntities()

    const entities = entityManager.getAllEntities();
    expect(findEntity(entities, Artifact)).toBeUndefined();
  });
});

const findEntity = (entities: Entities, Class) => {
  return entities.find((entity) => entity instanceof Class);
};
