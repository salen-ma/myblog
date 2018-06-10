<template>
  <section class="container">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <nuxt-link class="title" :to="'/md/' + item.id" tag="h3">{{item.title}}</nuxt-link>
        <div class="tags">
          <span v-for="(tag, index) in item.tags" :key="index">{{tag}}</span>
        </div>
        <p class="summary">{{item.summary}}</p>
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
      padding: 30px 0px;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      cursor: pointer;
      &:first-of-type {
        border-top: 1px solid rgba(0,0,0,0.1);
      }

      .title {
        font-size: 20px;
        color: #333;
        &:hover {
          text-decoration: underline;
        }
      }

      .summary {
        font-size: 14px;
        color: #999;
      }

      span {
        display: inline-block;
        margin: 5px;
      }
    }
  }
</style>
