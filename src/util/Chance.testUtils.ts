import { vi } from "vitest";
import { Chance } from "./Chance";

export const fakeChanceNeverHappens = () => {
  Chance.withProbability = vi
    .fn()
    .mockImplementation((probability, callback) => {
      return;
    });
};

export const fakeChanceAlwaysHappens = () => {
  Chance.withProbability = vi
    .fn()
    .mockImplementation((probability, callback) => {
      callback();
    });
};
