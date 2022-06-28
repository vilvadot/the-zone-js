import { Position, TargetManual, TargetClosest } from "../components";
import { Targetting } from "./Targetting";

describe("Targetting system", () => {
  it("respects hardcoded targets", () => {
    const targetId = 'victim'
    const attacker = new Attacker(new TargetManual('victim'), new Position(0,0));

    Targetting.run([attacker]);

    expect(attacker.target.id).toEqual(targetId);
  });

  it("finds closes target in range", () => {
    const targetId = 'victim'
    const victim = new Victim(new Position(0, 1))
    const attacker = new Attacker(new TargetClosest(), new Position(0,0));

    Targetting.run([attacker, victim]);

    expect(attacker.target.id).toEqual(targetId);
  });

  it("ignores targets out of range", () => {
    const targetId = 'victim'
    const victim = new Victim(new Position(0, 2))
    const attacker = new Attacker(new TargetClosest(), new Position(0,0));

    Targetting.run([attacker, victim]);

    expect(attacker.target.id).toEqual(null);
  });
});

class Victim {
  constructor(position) {
    this.id = "victim";
    this.position = position;
  }
}

class Attacker {
  constructor(target, position) {
    this.id = "attacker";
    this.target = target;
    this.position = position;
  }
}
