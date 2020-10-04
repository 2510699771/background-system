<template>
  <div>
    <el-card class="box-card">
      <div style="width:30vw;display:flex">
        <el-input placeholder="请输入搜索内容" v-model="value" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" style="margin-left:20px">添加用户</el-button>
      </div>
      <div style="width:100vw;margin-top:30px">
        <el-table :data="userslist" border style="width: 100%" stripe>
          <el-table-column prop="date" label="#" width="180" type="index" align="center"></el-table-column>
          <el-table-column prop="username" label="姓名" width="180" align="center"></el-table-column>
          <el-table-column prop="role_name" label="角色" align="center"></el-table-column>
          <el-table-column prop="create_time" label="电话" align="center"></el-table-column>
          <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
          <el-table-column prop="address" label="状态" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                @change="change(scope)"
                inactive-color="#A9A9A9"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-setting"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div style="margin-top:20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="uselist.length"
        ></el-pagination>
      </div>-->
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
      currentPage: 1,
      pageSizes: [5, 15, 20, 30],
      pagesize: 5, //每页显示条数
      pagenum: 1, //当前页码
      query: "", //查询参数
    };
  },
  methods: {
    change(e) {
      console.log(e);
      console.log(111);
    },
    //方法展开
    ...userActions(["getUsers"]),

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // getUsers() {
    //   this.$store.dispatch("user/getUsers", {
    //     query: this.query,
    //     pagenum: this.pagenum,
    //     pagesize: this.pagesize,
    //   });
    // },
  },
  mounted() {
    // this.getUsers();
    this.getUsers({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    //数据展开
    ...userState(["userslist"]),
  },
};
</script>

<style scoped lang='scss'>
</style>