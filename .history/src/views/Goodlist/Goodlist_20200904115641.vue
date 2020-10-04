<template>
  <div>    <!-- 表格组件(全) -->
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
    </myfrom></div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("good");
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
      pagesizes: [5, 15, 20, 30],
      pagesize: 5, //每页显示条数
      pagenum: 1, //当前页码
      query: "", //查询参数
    };
  },
  methods: {
    //方法展开
    ...userActions(["getGoods"]),
  },
  mounted() {
    this.getGoods({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    //数据展开
    ...userState(["goodList","total"]),
  },
};
</script>

<style scoped lang='scss'>
</style>