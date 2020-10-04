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
    tophistory,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    let name = localStorage.getItem("admitUser");
    let list = localStorage.getItem(admitUser");
  },
  watch: {
    toplist: {
      handler(val) {
        this.$bus.$emit("topHistory", val);
      },
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