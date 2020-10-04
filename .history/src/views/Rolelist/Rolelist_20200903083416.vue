<template>
  <div>
    <!-- 表格组件 -->
    <myfrom
      :roleList="roleList"
      :columns="columns"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :total="roleList.length"
      :showPaging="showPaging"
    >
      <template v-slot:state="scope">
        <el-switch v-model="scope.scope.row.mg_state"></el-switch>
      </template>
      <template v-slot:action="scope">
        <el-button type="primary" size="mini" @click="editor(scope.scope)">编辑</el-button>
        <el-button type="danger" size="mini" @click="del(scope.scope)">删除</el-button>
        <el-button type="warning" size="mini" @click="c(scope.scope)">分配权限</el-button>
      </template>
    </myfrom>

    <!-- 对话框组件 -->
    <mydialog :Visible.sync="Visible" @cancel="cancel" @confirm="confirm">
      <!-- <template v-slot:footer>
          <el-button >取 消</el-button>
          <el-button type="primary" >确 定</el-button>
      </template>-->
    </mydialog>
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
        },
      ],
      //是否展示分页
      showPaging: true,
      //第几页
      currentPage: 1,
      //每页数据数量
      pageSizes: [5, 10, 20, 30],
      //默认每页多少条数据
      pageSize: 5,
      //编辑对话框是否打开
      Visible: false,
      Dialogfrom:[
        {}
      ]
    };
  },
  methods: {
    //方法展开
    ...userActions(["getRoles"]),
    del(scope) {
      console.log(scope.row, "161");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //点击编辑打开对话框
    editor() {
      this.Visible = true;
    },
    //对话框取消
    cancel() {
  

      console.log("取消");
      this.Visible = false;
    },
    //对话框确定
    confirm() {
      
      console.log("确定");
      this.Visible = false;
    },
  },
  mounted() {
    this.getRoles();
  },
  watch: {},
  computed: {
    //数据展开
    ...userState(["roleList"]),
  },
};
</script>

<style scoped lang='scss'>
</style>