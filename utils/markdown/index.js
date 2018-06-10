var hljs = require("highlight.js");

var markdown_config = {
  html: true,
  xhtmlOut: true,
  breaks: true,
  langPrefix: "language-",
  linkify: false,
  typographer: true,
  quotes: "“”‘’",
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value + 
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + markdown.utils.escapeHtml(str) + "</code></pre>"
    );
  }
};
var markdown = require("markdown-it")(markdown_config);
// 表情
var emoji = require("markdown-it-emoji");
// 下标
var sub = require("markdown-it-sub");
// 上标
var sup = require("markdown-it-sup");
// <dl/>
var deflist = require("markdown-it-deflist");
// <abbr/>
var abbr = require("markdown-it-abbr");
// footnote
var footnote = require("markdown-it-footnote");
// insert 带有下划线 样式 ++ ++
var insert = require("markdown-it-ins");
// mark
var mark = require("markdown-it-mark");
// taskLists
var taskLists = require("markdown-it-task-lists");
var container = require("markdown-it-container");
// math katex
var katex = require('markdown-it-katex');
var miip = require('markdown-it-images-preview');

markdown
  .use(emoji)
  .use(taskLists)
  .use(sup)
  .use(sub)
  .use(container)
  .use(deflist)
  .use(abbr)
  .use(footnote)
  .use(insert)
  .use(mark)
  .use(container)
  .use(katex)
  .use(miip);
export default markdown;
