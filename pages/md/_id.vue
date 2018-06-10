<template>
  <div class="md_wrap markdown-body">
    <div v-html="mdHtml"></div>
  </div>
</template>

<script>
import { geMd } from "../../api/md.js";
export default {
  async asyncData({ params, error }) {
    let res = await geMd({id: params.id});
    if (res.status === 200) {
      return { mdHtml: res.data.html };
    }
  },

  head: {
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js' },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' },
    ]
  },
};
</script>

<style>
.md_wrap {
  position: absolute;
  width: 65%;
  padding: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
