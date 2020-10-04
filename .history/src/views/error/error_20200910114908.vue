<template>
  <div class="box">
    <img
      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3928634519,1708671973&fm=26&gp=0.jpg"
      alt
    />
    <el-button @click="backto">回到首页</el-button>
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
    return {};
  },
  methods: {
    backto() {
      this.$router.push("/");
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.box{
    dis
}
</style>