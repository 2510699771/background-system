<template>
  <div>商品列表</div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("good");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  //接受父组件传递的数据
  props: {},
  //注册组件
  components: {},
  data() {
    return {
      value: "",
      currentPage: 1,
      pagesizes: [5, 15, 20, 30],
      pagesize: 5, //每页显示条数
      pagenum: 1, //当前页码
      query: "", //查询参数
    };
  },
  methods: {
    //方法展开
    ...userActions(["getGoods"]),
  },
  mounted() {
    this.getGoods({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    //数据展开
    ...userState(["goodList","total"]),
  },
};
</script>

<style scoped lang='scss'>
</style>