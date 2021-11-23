'use strict';
const YAML = require("js-yaml")
const Node = require("./node")

// this code is licenced under MIT
// https://github.com/CaliStyle/markdown-it-meta
function meta_parse(state, start, end) {
  function get(state, line) {
    const pos = state.bMarks[line]
    const max = state.eMarks[line]
    return state.src.substr(pos, max - pos)
  }
  var startLine = state.line
  if (start !== 0 || state.blkIndent !== 0) {
    return false
  }
  if (state.tShift[start] < 0) {
    return false
  }
  if (!get(state, start).match(/^---$/)) {
    return false
  }
  const data = []
  let line = start
  while (line < end) {
    line++
    const str = get(state, line)
    if (str.match(/^---$/)) {
      break
    }
    if (state.tShift[line] < 0) {
      break
    }
    data.push(str)
  }
  var yaml = {}
  try {
    var yaml = YAML.load(data.join('\n'), {json: true})
  } catch (_) {}
  var token = state.push('meta', '', 0)
  token.content = yaml
  token.map = [startLine, state.line]
  token.children = [];
  state.line = line + 1
  return true
}

function meta_render(tokens, idx) {
  function make_table(data) {
    var doc = new Node()
    var isObject = function (o) {
      return (o instanceof Object && !(o instanceof Array)) ? true : false;
    };
    if (isObject(data)) {
      // 辞書だった場合
      // key (theadに入れる)
      var keys = doc.createElement("tr")
      // value (tbodyに入れる)
      var values = doc.createElement("tr")
      for (const key in data) {
        // key
        var j = doc.createElement("th")
        j.appendChild(make_table(key))
        keys.appendChild(j)
        // value
        var k = doc.createElement("td")
        k.appendChild(make_table(data[key]))
        values.appendChild(k)
      }
      // テーブルを作る
      var ret = doc.createElement("table")
      // tbody
      var thead = doc.createElement("thead")
      thead.appendChild(keys)
      ret.appendChild(thead)
      // tbody
      var tbody = doc.createElement("tbody")
      tbody.appendChild(values)
      ret.appendChild(tbody)
      return ret
    } else if (Array.isArray(data)) {
      // 配列だった場合 -> tbodyのみ
      var tbl = doc.createElement("tr")
      for (const i of data) {
        var j = doc.createElement("td")
        j.appendChild(make_table(i))
        tbl.appendChild(j)
      }
      // tbodyに入れる
      var tbody = doc.createElement("tbody")
      tbody.appendChild(tbl)
      var ret = doc.createElement("table")
      ret.appendChild(tbody)
      return ret
    } else if (data == undefined) {
      // データが無いとき
      return doc.createTextNode("")
    } else {
      // ただのデータ
      return doc.createElement("td").appendChild(doc.createTextNode(data))
    }
  }
  return make_table(tokens[idx].content).outerHTML
}

function MarkdownItMetaHeader(md) {
  md.block.ruler.before('code', 'meta', meta_parse)
  md.renderer.rules.meta = meta_render
}

module.exports = MarkdownItMetaHeader
