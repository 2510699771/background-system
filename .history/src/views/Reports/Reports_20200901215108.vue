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
          legend:{datathis.legend} ,
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
        console.log(this.xAxis, "11313");
      });
    },
  },
  mounted() {
    this.getReports();
    console.log(this.xAxis);

    this.search();
  },
  watch: {},
  computed: {
    //数据展开
    ...reportsState(["reportsList", "xAxis", "legend"]),
  },
};
</script>

<style scoped lang='scss'>
</style>