import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["src/dist"],
    environment: "jsdom",
    include: ["**/*.test.ts"],
    reporters: "verbose",
  },
});
