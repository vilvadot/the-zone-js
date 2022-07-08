import { resolve } from "path";
import { readFileSync } from "fs";
import { loadGame } from "./index";
import { Display } from "./Display";
import { Generator } from "./World/Generator";

const html = readFileSync(resolve(__dirname, "./index.html")).toString();

jest.mock("./Display");
jest.mock("./World/Generator");

describe("Game e2e", () => {
  const width = 3;
  const height = 3;
  beforeAll(() => {
    document.body.innerHTML = html;

    Display.mockImplementation(() => {
      return {
        init: () => {},
        draw: () => {},
      };
    });

    Generator.mockImplementation(() => {
      return {
        generate: (callback) => {},
      };
    });
  });

  it("loads everything correctly", () => {
    loadGame(width, height);
  });
});
