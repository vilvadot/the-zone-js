import { describe, expect, it, beforeEach } from 'vitest'
import { Damage, Health, Position, Sprite, TargetManual } from "../components/index.js";
import { Bus } from '../infra/bus.js';
import { Logger } from '../infra/logger.js';
import { Combat } from "./Combat.js";

describe("Combat system", () => {
  const bus = new Bus()
  const logger = new Logger(bus)

  it("an attacker hits a victim in range", () => {
    const attacker = new Attacker(10, new Position(0, 0));
    const victim = new Victim(10, new Position(0, 1));

    Combat.run(bus, logger, [attacker, victim]);

    expect(victim.health.value).toEqual(9);
  });

  it("an attacker does not hit a victim out of range", () => {
    const attacker = new Attacker(10, new Position(0, 0));
    const victim = new Victim(10, new Position(0, 2));

    Combat.run(bus, logger, [attacker, victim]);

    expect(victim.health.value).toEqual(10);
  });

  it("an attacker does not hit a dead victim", () => {
    const attacker = new Attacker(10, new Position(0, 0));
    const victim = new Victim(0, new Position(0, 1));

    Combat.run(bus, logger, [attacker, victim]);

    expect(victim.health.value).toEqual(0);
  });
});

class Victim {
  health: any;
  id: string;
  target: TargetManual;
  damage: Damage;
  position: Position;
  sprite: Sprite;

  constructor(health, position) {
    this.id = "victim";
    this.target = new TargetManual();
    this.health = new Health(health);
    this.damage = new Damage(1);
    this.position = position;
    this.sprite = new Sprite()
  }
}

class Attacker {
  id: string;
  target: TargetManual;
  health: Health;
  damage: Damage;
  position: Position;

  constructor(health, position) {
    this.id = "attacker";
    this.target = new TargetManual("victim");
    this.health = new Health(health);
    this.damage = new Damage(1);
    this.position = position;
  }
}
