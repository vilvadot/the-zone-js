import { createNode } from "../../util/index.js";

export class LogMessages {
  static update(message, color) {
    const $logs = document.querySelector("#log_messages");

    const $message = createNode({
      type: "p",
      className: "ui_log--message",
      style: `color: ${color}`,
      content: message,
    });

    $logs?.prepend($message);
  }
}
