<template>
  <div class="home">
    <!-- :model="info" -->
    <el-form ref="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="info.title"></el-input>
      </el-form-item>
      <!-- <el-form-item label="活动区域">
        <el-select v-model="content.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="info.content"></el-input>
        <Editor id="tinymce" v-model="info.content" :init="editorInit"></Editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver/theme";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";

// import 'tinymce/themes/silver'
// import 'tinymce/skins/content/default/content.css'
export default {
  name: "addAetcle",
  data() {
    return {
      info: {
        title: "",
        classify_id: 5,
        classify_name: "VUE",
        content: ""
      },
      editorInit: {
        language_url: "/tinymce/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        height: 500,
        inline: false, // true开启内联模式
        plugins:
          "link lists image code table colorpicker textcolor wordcount contextmenu",
        toolbar:
          "code bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image  | removeformat",
        branding: false,
        images_upload_url: ""
        // images_upload_handler: function(blobInfo, succFun, failFun) {
        //   var xhr, formData;
        //   var file = blobInfo.blob(); // 转化为易于理解的file对象
        //   xhr = new XMLHttpRequest();
        //   xhr.withCredentials = false;
        //   xhr.open("POST", config.url_post_publicUploadvoucher);
        //   xhr.onload = function() {
        //     let json;
        //     if (xhr.status !== 200) {
        //       failFun("HTTP Error: " + xhr.status);
        //       return;
        //     }
        //     json = JSON.parse(xhr.responseText);
        //     if (!json || typeof json.data !== "string") {
        //       failFun("Invalid JSON: " + xhr.responseText);
        //       return;
        //     }
        //     succFun(json.data);
        //   };
        //   formData = new FormData();
        //   formData.append("file", file, file.name); // 此处与源文档不一样
        //   xhr.send(formData);
        // }
      }
    };
  },
  components: {
    Editor
  },
  mounted() {
    tinymce.init({});
  },

  methods: {
    onSubmit() {
      this.$API
        .createArtcle(this.info)
        .then(res => {
          if (res.code === 0) {
            console.log(res);
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
</style>