'use strict';
const assert = require("assert")

// case 1
try {
  const MarkdownIt = require("markdown-it")
  const MarkdownItMetaHeader = require("./index")
  const md = new MarkdownIt()
  md.use(MarkdownItMetaHeader)
  const input = "---\n1: 2\n3: 4\n5:\n  - 6\n  - 7\n8:\n  - 9: 10\n  - [ 11, 12, 13 ]\n---\n"
  const expected = "<table><thead><tr><th>1</th><th>3</th><th>5</th><th>8</th></tr></thead><tbody><tr><td>2</td><td>4</td><td><table><tbody><tr><td>6</td><td>7</td></tr></tbody></table></td><td><table><tbody><tr><td><table><thead><tr><th>9</th></tr></thead><tbody><tr><td>10</td></tr></tbody></table></td><td><table><tbody><tr><td>11</td><td>12</td><td>13</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>"
  const actual = md.render(input)
  assert.equal(actual, expected)
} catch (err) {
  console.error(err)
}

// case 2
try {
  const MarkdownIt = require("markdown-it")
  const MarkdownItMetaHeader = require("./index")
  const md = new MarkdownIt()
  md.use(MarkdownItMetaHeader)
  const input = "---\n---"
  const expected = ""
  const actual = md.render(input)
  assert.equal(actual, expected)
} catch (err) {
  console.error(err)
}

// case3
try {
  const Node = require("./node")
  const n = new Node(["<p>", "</p>"])
  n.appendChild(n.createElement("p"))
  n.appendChild(n.createTextNode("><hoge\"\\\\><<<<>'&&"))
  const expected = "<p><p></p>&gt;&lt;hoge\"\\\\&gt;&lt;&lt;&lt;&lt;&gt;'&amp;&amp;</p>"
  const actual = n.outerHTML
  assert.equal(actual, expected)
} catch (err) {
  console.error(err)
}
