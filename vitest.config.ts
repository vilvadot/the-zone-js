import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ["src/dist"],
    include: ["src/Game.test.ts"],
    environment: "jsdom",
  }
});
