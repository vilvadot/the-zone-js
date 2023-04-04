export const findOrCreateNode = (selector, parentSelector) => {
  const parent = document.querySelector(parentSelector);
  let node = document.querySelector(selector);

  if (!node) {
    node = document.createElement("div");
    if (selector[0] === "#") node.id = selector.slice(1);
    if (selector[0] === ".") node.className = selector.slice(1);
    if (parent) parent.appendChild(node);
  }
  return node;
};

type NodeOptions = {
  type: string;
  id?: string;
  className?: string;
  content?: string;
  style?: string;
};

export const createNode = ({
  type,
  id,
  className,
  content,
  style,
}: NodeOptions) => {
  const node = document.createElement(type);
  if (className) node.className = className;
  if (id) node.id = id;
  if (content) node.innerHTML = content;
  // @ts-ignore-line
  if (style) node.style = style;

  return node;
};
