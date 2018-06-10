<template>
  <section id="Add_md">
    <h3 class="head">新建文章</h3>
    <no-ssr>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
      <FormItem label="标题" prop="title">
        <Input v-model="formValidate.title" placeholder="输入文章标题" />
      </FormItem>
      <FormItem label="摘要" prop="summary">
        <Input v-model="formValidate.summary" type="textarea" placeholder="输入文章摘要" />
      </FormItem>
      <FormItem label="标签" prop="tags">
        <CheckboxGroup v-model="formValidate.tags">
          <Checkbox label="Nuxt"></Checkbox>
          <Checkbox label="Node"></Checkbox>
          <Checkbox label="Express"></Checkbox>
          <Checkbox label="Mysql"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
    </no-ssr>
  </section>
</template>

<script>
import { createMd } from "~/api/md.js"
export default {
  data() {
    return {
      formValidate: {
        title: "",
        summary: "",
        tags: [],
      },
      ruleValidate: {
        title: [{ required: true, message: "The title cannot be empty", trigger: "blur" }],
        summary: [{ required: true, message: "The summary cannot be empty", trigger: "blur" }],
        tags: [
          { required: true, type: "array", min: 1, message: "Choose at least one tag", trigger: "change" },
        ],
      },
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.createMd()
          this.$Message.success("Success!")
        } else {
          this.$Message.error("Fail!")
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    },
    params(formValidate) {
      return {
        title: formValidate.title,
        summary: formValidate.summary,
        tags: formValidate.tags.join()
      }
    },
    createMd() {
      let params = this.params(this.formValidate)
      createMd(params).then(res => {
        console.log(res)
      })
    },
  },
}
</script>

<style lang="scss">
  #Add_md {
    position: absolute;
    left: 50%;
    top: 12%;
    transform: translateX(-50%);
    width: 50%;
    height: 500px;
    .head {
      margin-bottom: 20px;
      font-size: 16px;
      color: #464c5b;
    }
  }
</style>

