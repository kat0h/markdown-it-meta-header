# markdown-it-meta-header
![example workflow](https://github.com/kat0h/markdown-it-meta-header/actions/workflows/publish-to-npm.yaml/badge.svg)

**[DEMO](https://kat0h.github.io/markdown-it-meta-header/)**

![](https://user-images.githubusercontent.com/45391880/141127221-b483acd7-8fad-461f-b943-58a419ff5901.png)

## Usage

```
npm i markdown-it
npm i markdown-it-meta-header
```

```javascript
const MarkdownIt = require("markdown-it")
const MarkdownItMetaHeader = require("markdown-it-meta-header")

const md = new MarkdownIt()
md.use(MarkdownItMetaHeader)

md.render("---\n1: 2\n3: [4, 5, 6]\n---")
```

## License
MIT

## Author
Kotakato
