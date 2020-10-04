<template>
  <div>
    <myfrom :table-data="tableData" :columns="columns"></myfrom>
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
      columns: [
        {
          label: "姓名",
          prop: "username",
          align:"center",
          width:"800"
        },
        {
          label: "角色",
          prop: "rolt_name",
          align:"center"
        },
        {
          label: "电话",
          prop: "mobile",
          align:"center"
        },
        {
          label: "邮箱",
          prop: "email",
          align:"center"
        },
        {
          label: "状态",
          prop: "mg_state",
          align:"center"
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