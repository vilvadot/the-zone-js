import { resolve } from "path";
import { readFileSync } from "fs";
import { loadGame } from "./index";
import { Display } from "./Display";

const html = readFileSync(resolve(__dirname, "./index.html")).toString();

jest.mock("./Display");

describe("Game e2e", () => {
  const width = 3;
  const height = 3;
  beforeAll(() => {
    document.body.innerHTML = html;

    Display.mockImplementation(() => {
      return {
        clear: () => {},
        draw: () => {},

      };
    });
  });

  it("loads everything correctly", () => {
    loadGame(width, height);
  });
});
