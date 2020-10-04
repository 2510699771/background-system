<template>
  <div>数据报表</div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("reports");
const { mapState: reportsState, mapActions: reportsActions } = userModule;
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
    //方法展开
    ...reportsActions(["getReports"]),
  },
  mounted() {},
  watch: {},
  computed: {
    //数据展开
    ...reportsActions(["reportsList"]),
  },
};
</script>

<style scoped lang='scss'>
</style>