import { createNode } from "../../util/index.js";

export class LogMessages {
  node: HTMLElement;

  constructor() {
    this.node = document.querySelector("#logs") as HTMLElement;
    this.create()
  }

  update(message, color) {
    const $container = this.node.querySelector(".panel--content")!;
    const $message = createNode({
      type: "p",
      className: "ui_log--message",
      style: `color: ${color}`,
      content: message,
    });

    $container.prepend($message);
  }

  create() {
    this.node.innerHTML = `
      <h2 class="panel--title">Messages</h2>
        <div class="panel--content" style="max-height: 140px;">
      </div>
        `
  }
}
