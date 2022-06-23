export class Spawn {
  constructor(where = "random") {
    this.where = where;
  }

  isRandom() {
    return this.where === "random";
  }
}
