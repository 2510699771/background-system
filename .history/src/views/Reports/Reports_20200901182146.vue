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
      var myChart = echarts.init(document.getElementById(thisId));

      option = {
        tooltip: {
          trigger: "axis",
          /*show:false,//添加鼠标浮动窗口就消失了*/
          axisPointer: {
            type: "line", //指示器类型。  cross' 十字准星指示器 其他选项 line  shadow
            label: {
              backgroundColor: "rgba(255, 255, 255, .5)", //XY轴显示的小方块
            },
            crossStyle: {
              //线的颜色 axisPointer.type 为 'cross' 时有效。
              color: "#fff",
            },
          },
        },
        backgroundColor: "rgba(43, 62, 75, .5)", //背景颜色
        toolbox: {
          //工具栏
          show: false, //是否显示工具栏组件
        },
        legend: {
          data: ["营销流量", "自然流量"],
          textStyle: {
            color: "#FFF",
            fontSize: 15,
          },
        },
        grid: {
          left: "2%",
          right: "7%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false, //x轴两侧留白策略
            axisLabel: {
              show: true,
              textStyle: {
                color: "#FFF",
                fontSize: 15,
              },
            },
            splitLine: {
              //去掉网格线
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#FFF",
                fontSize: 15,
              },
            },
            axisTick: {
              lineStyle: {
                color: "#FFF",
                fontSize: 15,
              },
            },
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              show: true,
              textStyle: {
                color: "#FFF",
                fontSize: 15,
              },
            },
            splitLine: {
              //去掉网格线
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#FFF",
                fontSize: 15,
              },
            },
            axisTick: {
              lineStyle: {
                color: "#FFF",
                fontSize: 15,
              },
            },
          },
        ],
        series: [
          {
            name: "自然流量",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            color: ["#ff907f"], //对应上面data的背景色
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "营销流量",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            color: ["#52d2dd"], //对应上面data的背景色
            data: [120, 132, 101, 134, 90, 230, 210],
          },
        ],
      };
      myChart.setOption(option);
      myChart.setOption(option);
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