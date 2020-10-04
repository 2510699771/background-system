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
  },
  mounted() {
    this.getReports();
    let myChart3 = this.$echarts.init(document.getElementById("myChart3"));
    myChart3.setOption({
title: {
text: "堆叠区域图"
},
tooltip: {
trigger: "axis",//控制鼠标移入是否有提示信息
axisPointer: {
type: "cross",
label: {
backgroundColor: "#6a7985"
  }
  }
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