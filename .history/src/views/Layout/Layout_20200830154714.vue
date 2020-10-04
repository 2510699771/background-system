<template>
  <div>
    <el-container>
      <el-aside width="100%">
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
import top from "../../components/Layou/Top";
import left from "../../components/Layou/Left";
export default {
  name: "",
  //接受父组件传递的数据
  props: {},
  //注册组件
  components: {
      top,
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