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

    <template v-slot:tag>
      <div v-for="(item,index) in roleList" :key="index">
        if
      </div>
    </template>
    <!-- <template v-slot:action="scope">
      <el-button type="primary" size="mini" @click="editor(scope.scope.row)">编辑</el-button>
      <el-button type="danger" size="mini" @click="del(scope.scope)">删除</el-button>
      <el-button type="warning" size="mini" @click="c(scope.scope)">分配权限</el-button>
    </template>-->
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
          label: "权限名称",
          prop: "roleName",
          align: "center",
        },
        {
          label: "权限等级",
          prop: "roleDesc",
          align: "center",
          tag: true,
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
    };
  },
  methods: {
    //方法展开
    ...userActions(["getRoles"]),
    handleSizeChange() {},
    handleCurrentChange() {},
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