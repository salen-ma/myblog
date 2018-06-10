<template>
  <div id="Editer">
    <no-ssr>
      <mavon-editor ref='md' v-model="value" @save="save" @imgAdd="imgAdd"/>
    </no-ssr>
  </div>
</template>

<script>
import { readMd, saveMd, uploadImg } from "../../api/md.js";
export default {
  async asyncData({ params, error }) {
    let res = await readMd({id: params.id});
    if (res.status === 200) {
      return { value: res.data.value, id: params.id};
    }
  },

  methods: {
    save(value, render) {
      saveMd({ md_str: value, id: this.id}).then(res => {
        console.log(res);
      });
    },
    imgAdd(pos, $file) {
      console.log('uploadimg...')
      var formdata = new FormData();
      formdata.append("image", $file);
      uploadImg(formdata).then(res => {
        if(res.status === 200) {
          console.log(res.data.url)
          this.$refs.md.$img2Url(pos, res.data.url);
        }
      })
    }
  }
};
</script>

<style>
#Editer {
  height: 100%;
}

#Editer .markdown-body {
  height: 100%;
}
</style>

