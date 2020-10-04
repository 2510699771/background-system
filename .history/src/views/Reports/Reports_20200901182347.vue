<template>
  <div>
    <div id="myChart3" :style="{width: '100%', height: '500px'}"></div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const reportsModule = createNamespacedHelpers("reports");
const { mapState: reportsState, mapActions: reportsActions } = reportsModule;
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
    search() {
      let myChart = echarts.init(document.getElementById("groupChart"));
    },
  },
  mounted() {
    this.getReports();
  },
  watch: {},
  computed: {
    //数据展开
    ...reportsState(["reportsList"]),
  },
};
</script>

<style scoped lang='scss'>
</style>