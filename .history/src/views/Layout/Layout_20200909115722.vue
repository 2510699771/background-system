<template>
  <div>
    <el-container>
      <el-header height="50px">
        <top></top>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <left></left>
        </el-aside>
        <el-main>
          <div style="display:flex">
            <div
              v-for="(item,index) in this.$store.state.list"
              :key="index"
              style="display:flex;margin:20px"
            >
              <!--   v-if="$router.path" -->
              <el-tag v-if="$route.path===item.path">
                <i class="el-icon-s-opportunity"></i>
                {{item.authName}}
              </el-tag>
              <el-tag type="info" v-else>{{item.authName}}</el-tag>
            </div>
          </div>
          <tophistory></tophistory>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import top from "../../components/Layout/Top";
import left from "../../components/Layout/Left";
import tophistory from "../../components/tophistory/tophistory";
export default {
  name: "",
  //接受父组件传递的数据
  props: {},
  //注册组件
  components: {
    top,
    left,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log(this.$route.path);
  },
  watch: {
    list: {
      handler() {},
      deep: true,
    },
  },
  computed: {
    toplist() {
      return this.$store.state.list;
    },
  },
};
</script>

<style scoped lang='scss'>
.el-main {
  height: 860px;
}
</style>