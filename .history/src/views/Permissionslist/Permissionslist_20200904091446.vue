<template>
  <myfrom
    :roleList="roleList"
    :columns="columns"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
    :total="roleList.length"
    :showPaging="showPaging"
    :indexOptions="indexOptions"
    :table="table"
  >
    <template v-slot:state="scope">
      <el-switch v-model="scope.scope.row.mg_state"></el-switch>
    </template>
    <template v-slot:action="scope">
      <el-button type="primary" size="mini" @click="editor(scope.scope.row)">编辑</el-button>
      <el-button type="danger" size="mini" @click="del(scope.scope)">删除</el-button>
      <el-button type="warning" size="mini" @click="c(scope.scope)">分配权限</el-button>
    </template>
  </myfrom>
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
        {
          label: "操作",
          align: "center",
        },
      ],
    };
  },
  methods: {
    //方法展开
    ...userActions(["getRoles"]),
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