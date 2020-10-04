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
    let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: this.reportsList.legend,
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.reportsList.xAxis[0].data,
          },
        ],
        yAxis: [
          {
            type: this.reportsList.yAxis[0].type,
          },
        ],
        series: this.reportsList.series,
      },
  },
  mounted() {
    this.getReports();
    this.search();
  },
  watch: {},
  computed: {
    //数据展开 
      
      // myChart.setOption(option)
    ...reportsState(["reportsList"]),
  },
}
}
</script>

<style scoped lang='scss'>
</style>