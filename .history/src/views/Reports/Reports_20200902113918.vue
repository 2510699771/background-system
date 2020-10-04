<template>
  <div class="hello">
    <chart :options="orgOptions" style="width:86vw;height:500px"></chart>
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
      this.$nextTick(() => {
        let mychart =this.
        this.orgOptions = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a3849",
              },
            },
          },
          legend: this.legend,
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          grid: {
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: this.xAxis[0].data,
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: this.series,
        };
      });
    },
  },
  mounted() {
    this.getReports();
  },
  watch: {
    xAxis() {
      this.search();
    },
  },
  computed: {
    //数据展开
    ...reportsState(["reportsList", "xAxis", "legend", "series"]),
  },
};
</script>

<style scoped lang='scss'>
</style>