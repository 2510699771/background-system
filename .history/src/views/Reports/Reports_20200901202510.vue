<template>
  <div>
    <div id="myChart" :style="{width: '100%', height: '500px'}"></div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const reportsModule = createNamespacedHelpers("reports");
const { mapState: reportsState, mapActions: reportsActions } = reportsModule;
let echarts = require("echarts/lib/echarts");
export default {

  methods: {
    //方法展开
    ...reportsActions(["getReports"]),
    search() {
    
  },
  mounted() {
    this.getReports();
    this.search();
  },
  watch: {},
  computed: {
    //数据展开 let myChart = echarts.init(document.getElementById("groupChart"));
      
      // myChart.setOption(option)
    ...reportsState(["reportsList"]),
  },
}
</script>

<style scoped lang='scss'>
</style>