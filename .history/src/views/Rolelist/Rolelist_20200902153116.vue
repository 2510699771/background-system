<template>
  <div>
    <myfrom :table-data="tableData" :colums="colums"></myfrom>
  </div>
</template>

<script>
export default {
  name: "",
  //接受父组件传递的数据
  props: {},
  //注册组件
  components: {},
  data() {
    return {
      //总的数据
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      //表格的配置项
      colums: [
        {
        label="姓名",
        prop="username"
      },   {
        label="角色",
        prop="username"
      },
         {
        label="姓名",
        prop="username"
      },
         {
        label="姓名",
        prop="username"
      },
         {
        label="姓名",
        prop="username"
      },
      ],
    };
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>