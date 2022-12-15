import { Health } from "../../components/index.js";

export class HealthBar {
  static update(remainingHealth: number, totalHealth: number) {
    const $container = document.querySelector("#ui_healthBar") as HTMLDivElement;

    const currentHealth = Math.ceil(remainingHealth)
    const health = "■".repeat(currentHealth)
    const damage = "◻︎".repeat(totalHealth - currentHealth)

    $container.innerHTML = `${health}${damage}`
  }
}
