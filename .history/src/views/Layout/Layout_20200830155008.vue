<template>
  <div>
    <el-container>
      <el-aside >
        <top></top>
      </el-aside>
      <el-container>
        <el-header>
          <left></left>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import top from "../../components/Layout/Top";
import left from "../../components/Layout/Left";
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
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>