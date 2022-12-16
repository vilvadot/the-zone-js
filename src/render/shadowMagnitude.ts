import { DEBUG_ENABLED } from "../config.js";

export const shadowMagnitude = (distance) => {
  const FLASHLIGHT_INTENSITY = DEBUG_ENABLED ? 100 : 3;
  let shadowing = (1 / distance) * FLASHLIGHT_INTENSITY;

  if (shadowing > 1) shadowing = 1;

  return shadowing;
};
