<template>
  <div>
    <el-card class="box-card">
      <div style="width:30vw;display:flex">
        <el-input placeholder="请输入搜索内容" v-model="value" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" style="margin-left:20px" @click="openadd">添加用户</el-button>
      </div>
      <div style="width:84.5vw;margin-top:30px">
        <el-table :data="userslist" border style="width: 100%" stripe>
          <el-table-column prop="date" label="#" width="70" type="index" align="center"></el-table-column>
          <el-table-column prop="username" label="姓名" align="center"></el-table-column>
          <el-table-column prop="role_name" label="角色" align="center"></el-table-column>
          <el-table-column prop="create_time" label="电话" align="center"></el-table-column>
          <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
          <el-table-column prop="address" label="状态" width="70" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                @change="change(scope)"
                inactive-color="#A9A9A9"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" align="center" width="350px" min-width="10px">
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
                @click="del(scope.$index, scope.row)"
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
          :total="total"
        ></el-pagination>
      </div>-->
      <!-- 添加对话框 -->
      <el-dialog title="添加用户" :visible.sync="addbounced">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" required>
            <el-input v-model="ruleForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addbounced = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
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
      pagesize: 10, //每页显示条数
      pagenum: 1, //当前页码
      query: "", //查询参数
      id: "", //用户id
      ruleForm: {
        username: "", //添加用户姓名
        password: "", //添加用户密码
        email: "", //邮箱
        mobile: "", //电话
      },
      addbounced: false, //添加用户对话框
      delbounced: false, //删除用户提示框
      //验证表单
      rules: {
        username: [
          {
            required: true, //是否必选项 默认为flase
            message: "用户名不能为空", //错误提示
            trigger: "blur", //触发方式
          },
          { min: 2, max: 8, message: "用户名在2-8位之间", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 8, max: 12, message: "密码在8-12位之间", trigger: "blur" },
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //开关
    change(e) {
      console.log(e);
      console.log(111);
    },
    //打开添加对话框
    openadd() {
      this.addbounced = true;
    },
    //方法展开
    ...userActions(["getUsers", "delUser", "addUser"]),

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    del(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.id = row.id;
          console.log(this.id);
          this.delbounced = true;

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //添加用户对话框确定
    add() {
      this.addUser({
        username: this.ruleForm.username, //添加用户姓名
        password: this.ruleForm.password, //添加用户密码
        email: this.ruleForm.email, //邮箱
        mobile: this.ruleForm.mobile, //电话
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
      this.addbounced = false;
      this.ruleForm.username = "";
      this.ruleForm.password = "";
      this.ruleForm.email = "";
      this.ruleForm.mobile = "";
    },
  },
  mounted() {
    this.getUsers({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    //数据展开
    ...userState(["userslist", "total"]),
  },
};
</script>

<style scoped lang='scss'>
</style>