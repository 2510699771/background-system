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
          <div>
            <div v-for="(item,index) in this.$store.state.list" :key="index">
              <!-- <el-tag>  v-if="$router.path" -->
                <i class="el-icon-s-opportunity"></i>
                {{item.authName}}
              </el-tag>
            </div>
          </div>
          <router-view />
        </el-main>
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
  mounted() {
    console.log(this.$route);
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.el-main {
  height: 860px;
}
</style>