'use strict';
class Node {
  constructor(element = []) {
    this.n = element
  }
  createElement(tag) {
    return new Node(["<" + tag + ">", "</" + tag + ">"])
  }
  createTextNode(data) {
    var text = data
    if ((typeof text) == 'number') {
      text = new String(data)
    }
    text = String(text)
    return new Node([
      text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
    ])
  }
  appendChild(element) {
    this.n = [...(this.n.slice(0, -1)), ...element.node, ...this.n.slice(-1)]
    return element
  }
  get node() {
    return this.n
  }
  get outerHTML() {
    const ret = this.n.join("")
    return ret !== undefined ? ret : ""
  }
}

module.exports = Node
