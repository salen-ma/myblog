<template>
  <section id="Add_tag">
    <h3 class="head">新建标签</h3>
    <no-ssr>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
      <FormItem label="标签名" prop="tagName">
        <Input v-model="formValidate.tagName" placeholder="输入标签名" />
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
import { createTag } from "~/api/tag.js"
export default {
  data() {
    return {
      formValidate: {
        tagName: ""
      },
      ruleValidate: {
        tagName: [{ required: true, message: "The name cannot be empty", trigger: "blur" }],
        summary: [{ required: true, message: "The summary cannot be empty", trigger: "blur" }],
      },
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.createTag()
          this.$Message.success("Success!")
          this.$refs[name].resetFields()
        } else {
          this.$Message.error("Fail!")
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    },
    createTag() {
      let params = this.formValidate
      createTag(params).then(res => {
        console.log(res)
      })
    },
  },
}
</script>

<style lang="scss">
  #Add_tag {
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

