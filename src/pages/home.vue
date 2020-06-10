<template>
  <div class="home">
    <el-row id="artList" type="flex" justify="space-around">
      <el-col :span="16">
        <el-row class="art-item" v-for="(item,index) in list" :key="index">
          <el-card shadow="hover">
            <h5>
              <router-link to="/article" tag="span" class="art-title">{{item.title}}</router-link>
            </h5>
            <el-row class="art-info d-flex align-items-center justify-content-start">
              <div class="art-time">
                <i class="el-icon-time"></i>
                ：{{item.creat_time}}
              </div>
              <div class="d-flex align-items-center">
                <img class="tag" src="../assets/tag.png" />：
                <el-tag size="mini">swagger2</el-tag>
              </div>
            </el-row>
            <el-row class="art-body">
              <div class="side-img hidden-sm-and-down">
                <img class="art-banner" src="../assets/vue.jpg" />
              </div>
              <div class="side-abstract">
                <div class="art-abstract">{{item.artcle_describe}}</div>
                <div class="art-more">
                  <router-link :to="'/article/'+item.id" tag="span">
                    <el-button plain >{{$t('home.readMore')}}</el-button>
                  </router-link>
                  <div class="view">
                    <i class="el-icon-view"></i>
                    {{item.view_count}}
                  </div>
                </div>
              </div>
            </el-row>
          </el-card>
          <img class="star" src="../assets/star.png" />
        </el-row>

        <div class="block pagination">
          <!-- <el-pagination :background="true" layout="prev, pager, next" :total="total"></el-pagination> -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="params.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-col>
      <el-col :span="6" class="hidden-sm-and-down" id="side">
        <div class="item">
          <tag></tag>
        </div>
        <div class="item">
          <friend></friend>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import friend from "../components/friend";
import tag from "../components/tag";
import { formatDate } from "@/tool/tools.js";
export default {
  name: "home",
  components: {
    friend,
    tag
  },
  data() {
    return {
      params: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      list: []
    };
  },
  created() {
    this.loading();
  },
  methods: {
    goto(item) {
      console.log(item);
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.loading();
    },
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.loading();
    },
    loading() {
      this.$API
        .listArtcle(this.params)
        .then(res => {
          if (res.code === 0) {
            this.list = res.data.list;
            this.list.forEach(item => {
              item.creat_time = formatDate(new Date(item.creat_time));
            });
            this.total = res.data.total;
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
#side .item {
  margin-bottom: 30px;
}

.art-item {
  margin-bottom: 30px;
  position: relative;
}

.art-item .star {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 0;
  right: 0;
}

img.tag {
  width: 16px;
  height: 16px;
}

.art-title {
  border-left: 3px solid #f56c6c;
  padding-left: 5px;
  cursor: pointer;
}

.art-title:hover {
  padding-left: 10px;
  color: #409eff;
}

.art-time {
  margin-right: 20px;
}

.art-body {
  display: flex;
  padding: 10px 0;
}

.side-img {
  height: 150px;
  width: 270px;
  overflow: hidden;
  margin-right: 10px;
}

img.art-banner {
  width: 100%;
  height: 100%;
  transition: all 0.6s;
}

img.art-banner:hover {
  transform: scale(1.4);
}

.side-abstract {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.art-abstract {
  flex: 1;
  color: #aaa;
}

.art-more {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.art-more .view {
  color: #aaa;
}
h5 {
  font-size: 18px;
}
.pagination {
  background-color: #f9f9f9;
}
</style>