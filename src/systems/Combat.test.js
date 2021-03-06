import { Damage, Health, Position, Sprite, TargetManual, Animation } from "../components";
import { Combat } from "./Combat";
import { Logger } from "../Logger.stub";
import { Bus } from "../events";

const bus = new Bus()

describe("Combat system", () => {
  it("an attacker hits a victim in range", () => {
    const attacker = new Attacker(10, new Position(0, 0));
    const victim = new Victim(10, new Position(0, 1));

    Combat.run(bus, Logger(), [attacker, victim]);

    expect(victim.health.value).toEqual(9);
  });

  it("an attacker does not hit a victim out of range", () => {
    const attacker = new Attacker(10, new Position(0, 0));
    const victim = new Victim(10, new Position(0, 2));

    Combat.run(bus, Logger(), [attacker, victim]);

    expect(victim.health.value).toEqual(10);
  });

  it("an attacker does not hit a dead victim", () => {
    const attacker = new Attacker(10, new Position(0, 0));
    const victim = new Victim(0, new Position(0, 1));

    Combat.run(bus, Logger(), [attacker, victim]);

    expect(victim.health.value).toEqual(0);
  });
});

class Victim {
  constructor(health, position) {
    this.id = "victim";
    this.target = new TargetManual();
    this.health = new Health(health);
    this.damage = new Damage(1);
    this.position = position;
    this.sprite = new Sprite()
    this.animation = new Animation()
  }
}

class Attacker {
  constructor(health, position) {
    this.id = "attacker";
    this.target = new TargetManual("victim");
    this.health = new Health(health);
    this.damage = new Damage(1);
    this.position = position;
  }
}
