<template>
  <section class="Admin">
    <no-ssr>
    <Table border :columns="columns" :data="data"></Table>
    </no-ssr>
  </section>
</template>

<script>
import { geMdList } from "../api/md.js"
export default {
  async asyncData({ params, error }) {
    let res = await geMdList();
    if (res.status === 200) {
      return { data: res.data.mdList };
    }
  },
  data() {
    return {
      columns: [
        {
          title: "Title",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h("strong", params.row.title)
            ])
          }
        },
        {
          title: "Summary",
          key: "summary"
        },
        {
          title: "Tags",
          key: "tags",
          render: (h, params) => {
            return h("div", [
              h("strong", params.row.tags.map(item => item.name).join(", "))
            ])
          }
        },
        {
          title: "Action",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.row.id);
                    }
                  }
                },
                "View"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row.id);
                    }
                  }
                },
                "Edit"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.id);
                    }
                  }
                },
                "Delete"
              )
            ])
          }
        }
      ],
    }
  },
  methods: {
    show(id) {
      console.log(id)
      this.$router.push('/md/' + id)
    },
    edit(id) {
      this.$router.push('/editmd/' + id)
    },
    remove(index) {
      
    },
  }
}
</script>

<style lang="scss">
  .Admin {
    padding: 50px 100px;
  }
</style>
