<template>
  <div>
    <div style="margin-bottom:20px">
      <el-button type="primary" @click="addRole">添加角色</el-button>
    </div>
    <!-- 表格组件(全) -->
    <myfrom
      :roleList="roleList"
      :columns="columns"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :total="roleList.length"
      :showPaging="showPaging"
      :indexOptions="indexOptions"
      :table="table"
      :expandOptions="expandOptions"
    >
      <!-- 开关插槽 -->
      <template v-slot:state="scope">
        <el-switch v-model="scope.scope.row.mg_state"></el-switch>
      </template>
      <!-- 展开表格行插槽 -->
      <template v-slot:expand="scope">
        <el-button @click="qwe(scope)">3123132</el-button>
        <div>
          <el-tag v-for="(item,index) in scope.scope.row.children" :key="index"></el-tag>
        </div>
      </template>
      <!-- 操作按钮插槽 -->
      <template v-slot:action="scope">
        <el-button type="primary" size="mini" @click="editor(scope.scope.row)">编辑</el-button>
        <el-button type="danger" size="mini" @click="del(scope.scope)">删除</el-button>
        <el-button type="warning" size="mini" @click="distributionclick(scope.scope)">分配权限</el-button>
      </template>
    </myfrom>

    <!-- 对话框组件(全) -->
    <mydialog
      :Visible.sync="Visible"
      :Dialogfrom="Dialogfrom"
      @cancel="cancel"
      @confirm="confirm"
      @Visible="present"
      :title="title"
    >
      <!-- <template v-slot:footer>
          <el-button >取 消</el-button>
          <el-button type="primary" >确 定</el-button>
      </template>-->
    </mydialog>

    <!-- 对话框组件 -->
    <mydialog
      :Visible.sync="Visible1"
      :Dialogfrom="Dialogfrom1"
      @cancel="cancel"
      @confirm="add"
      @Visible="present"
      :title="title1"
    ></mydialog>

    <el-dialog title="分配权限" :visible.sync="openpermissions">
      <el-tree
        :data="distribution"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
        :props="defaultProps"
      ></el-tree>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("permissions");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  //接受父组件传递的数据
  props: {},
  //注册组件
  components: {},
  data() {
    return {
      expandOptions: true, //是否展示表格的行展开
      id: "", //编辑提交角色id
      type: "tree",
      openpermissions: false,
      defaultProps: {
        children: "children",
        label: "authName",
      },
      //表格的配置项
      columns: [
        {
          label: "职位",
          prop: "roleName",
          align: "center",
        },
        {
          label: "描述",
          prop: "roleDesc",
          align: "center",
        },
        // {
        //   label: "状态",
        //   align: "center",
        //   prop: "ms",
        //   width: "400",
        //   slots: "state",
        // },
        {
          label: "操作",
          align: "center",
          slots: "action",
        },
      ],

      //table配置
      table: {
        //是否创建带斑马纹
        stripe: true,
        //是否需要竖直方向的边框
        border: true,
        //Table 的尺寸medium / small / mini
        size: "medium",
      },

      //表格配置
      indexOptions: {
        label: "#",
        align: "center",
        indexMethod: 0,
        showIndex: true,
      },
      //是否展示分页
      showPaging: false,
      //第几页
      currentPage: 1,
      //每页数据数量
      pageSizes: [5, 10, 20, 30],
      //默认每页多少条数据
      pageSize: 5,

      //编辑对话框是否打开
      Visible1: false,
      //对话框标题
      title1: "编辑角色",
      dialogWidth: "800px",
      //添加对话框配置内容
      Dialogfrom1: [
        //单个输入框配置项目
        {
          type: "input",
          lable: "角色名",
          value: "",
          //验证规则
          prop: "rolename",
          rules: [
            {
              required: true,
              message: "角色名不能为空",
              trigger: "blur",
            },
          ],
          //attrs内写输入框的单个配置
          attrs: {
            placeholder: "请输入",
            //清空输入框图标
            clearable: true,
          },
        },
        {
          type: "input",
          lable: "角色描述",
          prop: "roledescribe",
          value: "",
          rules: [],
          attrs: {
            placeholder: "请输入",
            //清空输入框图标
            clearable: true,
            "show-password": false,
          },
        },
      ],
      //编辑对话框是否打开
      Visible: false,
      //对话框标题
      title: "编辑角色",

      //对话框配置内容
      Dialogfrom: [
        //单个输入框配置项目
        {
          type: "input",
          lable: "角色名",
          value: "",
          //验证规则
          prop: "rolename",
          rules: [
            {
              required: true,
              message: "角色名不能为空",
              trigger: "blur",
            },
          ],
          //attrs内写输入框的单个配置
          attrs: {
            placeholder: "请输入",
            //清空输入框图标
            clearable: true,
          },
        },
        {
          type: "input",
          lable: "角色描述",
          prop: "roledescribe",
          value: "",
          rules: [
            {
              required: true,
              message: "描述不能为空",
              trigger: "blur",
            },
          ],
          attrs: {
            placeholder: "请输入",
            //清空输入框图标
            clearable: true,
            "show-password": false,
          },
        },
        // {
        //   type: "select",
        //   lable: "角色描述",
        //   prop: "chose",
        //   value: "",
        //   attrs: {
        //     placeholder: "请选择",
        //     //清空输入框图标
        //     clearable: false,
        //     "show-password": false,
        //   },
        //   children: [
        //     {
        //       type: "option",
        //       value: "选项1",
        //       label: "黄金糕",
        //     },
        //     {
        //       type: "option",
        //       value: "选项2",
        //       label: "双皮奶",
        //     },
        //     {
        //       type: "option",
        //       value: "选项3",
        //       label: "蚵仔煎",
        //     },
        //     {
        //       type: "option",
        //       value: "选项4",
        //       label: "龙须面",
        //     },
        //     {
        //       type: "option",
        //       value: "选项5",
        //       label: "北京烤鸭",
        //     },
        //   ],
        // },
      ],
    };
  },
  methods: {
    //方法展开
    ...userActions([
      "getRoles",
      "SubmitRole",
      "adRole",
      "delRole",
      "getRights",
    ]),
    qwe(e) {
      console.log(e.scope.row);
    },
    //打开权限列表对话框
    distributionclick() {
      this.openpermissions = true;
    },
    add(val) {
      console.log(val.value, "添加");
      val.myfrom.validate((vaild) => {
        if (vaild) {
          this.adRole({
            roleName: val.value.rolename,
            roleDesc: val.value.roledescribe,
          });
          this.Visible1 = false;
          this.$message.success("点击了确定");
          // val.myfrom.resetFields();
        } else {
          this.$message.error("表单填写有误，请检查");
        }
      });
    },
    del(scope) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delRole({ id: scope.row.id });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //点击编辑打开对话框
    editor(e) {
      this.id = e.id;
      //给子组件传值
      this.Dialogfrom[0].value = e.roleName;
      this.Visible = true;
    },
    //对话框取消
    cancel(val) {
      this.$message("点击了取消");
      this.Visible = false;
      val.myfrom.resetFields(); //清空表格
    },
    //对话框确定
    confirm(val) {
      val.myfrom.validate((vaild) => {
        if (vaild) {
          this.SubmitRole({
            id: this.id,
            roleName: val.value.rolename,
            roleDesc: val.value.roledescribe,
          });
          this.Visible = false;
          this.$message.success("点击了确定");
          // val.myfrom.resetFields();
        } else {
          this.$message.error("表单填写有误，请检查");
        }
      });
    },
    //子组件分发事件(点旁边空白或右上角X号关闭)
    present() {
      this.Visible = false;
      this.Visible1 = false;
    },
    //添加角色
    addRole() {
      this.Visible1 = true;
    },
  },
  mounted() {
    this.getRoles();
    this.getRights({ type: this.type });
  },
  watch: {},
  computed: {
    //数据展开
    ...userState(["roleList", "distribution"]),
  },
};
</script>

<style scoped lang='scss'>
</style>