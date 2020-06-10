<template>
  <div>
    <el-row class="main" type="flex" justify="center">
      <el-col :span="16">
        <div id="artcle-info">
          <h2 class="text-center">
            <strong>{{info.title}}</strong>
          </h2>
          <!-- 描述：文章信息 -->
          <div class="text-center timeAndView">
            <span class="article-time">
              <i class="el-icon-time"></i>
              发表于：
              <span>{{info.creat_time}}</span>
            </span>
            &nbsp;|&nbsp;
            <span class="article-views">
              <i class="el-icon-view"></i>
              阅读量：
              <span>{{info.view_count}}</span>
            </span>
          </div>
          <p class="abstract">{{info.artcle_describe}}</p>
        </div>
        <hr />
        <div id="artcle-content" v-html="info.content"> </div>
        <div id="statement">
          <div class="item">{{$t('article.author')}}：{{info.author}}</div>
          <div class="item">
            {{$t('article.originalLink')}}：
            <a href="https://www.fengziy.cn/">https://www.fengziy.cn/</a>
          </div>
          <div class="item">{{$t('article.copyright')}}：本博客所有文章除特别声明外,转载请注明出处!</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { formatDate } from "@/tool/tools.js";
export default {
  name: "articleDateil",
  data() {
    return {
		info:{}
	};
  },
  mounted() {
	this.loading();
  },
  methods: {
    loading() {
      this.$API
        .artcleDetail({id:this.$route.params.id})
        .then(res => {
          if (res.code === 0) {
            this.info = res.data;
            this.info.creat_time = formatDate(new Date(this.info.creat_time));
            this.$message({
              type: "success",
              message: res.message
            });
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
#artcle-info {
  padding: 20px;
  background-image: url(../assets/vue.jpg);
  margin-bottom: 40px;
}

#artcle-info .abstract {
  color: #ffffff;
  border-left: 3px solid #f56c6c;
  padding: 10px;
  background-color: rgba(126, 129, 135, 0.3);
}

#artcle-info .timeAndView {
  padding: 20px;
  line-height: 30px;
  font-size: 16px;
  color: #ffffff;
}

pre.has {
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.8);
}

img.has {
  width: 100%;
}

#statement {
  border-left: 3px solid #f56c6c;
  padding: 20px;
  background-color: #ebeef5;
}
</style>