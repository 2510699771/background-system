<template>
  <div class="hello">
    <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
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
    return {
      orgOptions: {},
      time: [],
    };
  },
  methods: {
    //方法展开
    ...reportsActions(["getReports"]),
    search() {
      
      this.orgOptions = {
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
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxis,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: this.reportsList.series,
      };
    },
  },
  mounted() {
    this.getReports();
    console.log(this.xAxis);

    this.$nextTick(() => {
      this.search();
    });
  },
  watch: {},
  computed: {
    //数据展开
    ...reportsState(["reportsList", "xAxis"]),
  },
};
</script>

<style scoped lang='scss'>
</style>