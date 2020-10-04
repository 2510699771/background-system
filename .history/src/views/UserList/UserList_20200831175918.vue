<template>
  <div>
    <el-card class="box-card">
      <div style="width:30vw;display:flex">
        <el-input placeholder="请输入搜索内容" v-model="value" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" style="margin-left:20px">添加用户</el-button>
      </div>
      <div style="width:70vw;margin-top:30px">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </div>
      <div style="margin-top:20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="uselist.length"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  //接受父组件传递的数据
  props: {},
  //注册组件
  components: {},
  data() {
    return {
      value: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      currentPage: 1,
      pageSizes: [5, 15, 20, 30],
      pageSize: 5, //每页显示条数
      pagenum: "", //当前页码
      query: "", //查询参数
    };
  },
  methods: {
    //方法展开
    ...userActions(["getUsers"]),
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getUserslist() {
      this.$store.dispatch("user/getUsers", {
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query,
      });
    },
  },
  mounted() {
    this.getUsers();
  },
  watch: {},
  computed: {
    //数据展开
    ...userState(["menus"]),
  },
};
</script>

<style scoped lang='scss'>
</style>