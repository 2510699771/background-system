<template>
  <div>
    <div style="display:flex">
      <div
        v-for="(item,index) in this.$store.state.list"
        :key="index"
        style="display:flex;margin:20px"
      >
        <!-- v-if="$router.path" -->
        <el-tag v-if="$route.path===item.path" closable @close="handleClose(index)">
          <i class="el-icon-s-opportunity"></i>
          {{item.authName}}
        </el-tag>
        <el-tag type="info" v-else>{{item.authName}}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  //接受父组件传递的数据
  props: {},
  //注册组件
  components: {},
  data() {
    return {
      list: [],
    };
  },
  methods: {
      //关闭
  },
  mounted() {
    this.$bus.$on("topHistory", (data) => {
      console.log(data);
      this.list = data;
    });
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>