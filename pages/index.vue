<template>
  <section class="container">
    <ul>
      <li v-for="item in list" :key="item.id">
        <nuxt-link class="title" :to="'/md/' + item.id" tag="h3">{{item.title}}</nuxt-link>
        <p class="summary">{{item.summary}}</p>
        <no-ssr>
        <div class="tags">
          <Tag v-for="tag in item.tags" :key="tag.id" type="border">{{tag.name}}</Tag>
        </div>
        </no-ssr>
      </li>
    </ul>
  </section>
</template>

<script>
import { geMdList } from "../api/md.js"
export default {
  async asyncData({ params, error }) {
    let res = await geMdList();
    if (res.status === 200) {
      return { list: res.data.mdList };
    }
  },
}
</script>

<style lang="scss">
  .container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    padding: 20px;
    li {
      position: relative;
      padding: 30px 0px;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      cursor: pointer;

      .title {
        font-size: 20px;
        color: #333;
        &:hover {
          text-decoration: underline;
        }
      }

      .tags {
        position: absolute;
        bottom: 5px;
        right: 5px;
      }

      .summary {
        font-size: 14px;
        color: #999;
      }
    }
  }
</style>
