<template>
  <div>
    <myfrom :roleList="roleList" :columns="columns">
      <template v-slot:action="scope">
        <el-button type="primary" size="mini" @click="del(scope.scope)">编辑</el-button>
        <el-button type="danger" size="mini" @click="del(scope.scope)">删除</el-button>
        <el-button type="warning" size="mini" @click="del(scope.scope)">分配权限</el-button>
      </template>
    </myfrom>
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
          width: "400",
        },
        {
          label: "描述",
          prop: "roleDesc",
          align: "center",
          width: "400",
        },
        {
          label: "状态",
          prop: "roleDesc",
          align: "center",
          width: "400",
           slots: "state",
        },
        {
          label: "操作",
          slots: "state",
        },
      ],
    };
  },
  methods: {
    //方法展开
    ...userActions(["getRoles"]),
    del(scope) {
      console.log(scope.row, "161");
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