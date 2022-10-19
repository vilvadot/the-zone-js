import { createNode } from "../../util.js";

export class LogMessages {
  static update(message, color) {
    const $logs = document.querySelector("#ui_log");

    const $message = createNode({
      type: "span",
      className: "ui_log-message",
      style: `color: ${color}`,
      content: message,
    });

    const $line = createNode({ type: "p" });
    $line.appendChild($message);

    $logs?.prepend($line);
  }
}
