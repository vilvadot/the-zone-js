import { createNode } from "../../util/index.js";

export class LogMessages {
  node: HTMLElement;

  constructor() {
    this.node = document.querySelector("#logs") as HTMLElement;
    this.create()
  }

  update(message, color) {
    const $container = this.node.querySelector(".ui_panel--content")!;
    console.log(this.node)
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
      <h2 class="ui_panel--title">Messages</h2>
        <div class="ui_panel--content">
      </div>
        `
  }
}
