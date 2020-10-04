<template>
  <div>
    <myfrom
      :roleList="goodList"
      :columns="columns"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :total="total"
      :pageSize="pagesize"
      :currentPage="pagenum"
      :showPaging="showPaging"
      :indexOptions="indexOptions"
      :table="table"
    >
      <template v-slot:state="scope">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editor(scope.scope.row)"></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="delGood(scope.scope.row)"
        ></el-button>
      </template>
    </myfrom>
  </div>
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
      type: [1, 2, 3], //获取级别的分类
      pagenum: 1, //当前页码值
      pagesize: 10, //每页显示多少条数据
    };
  },
  methods: {
    //方法展开
    ...userActions(["getCategories"]),
  },
  mounted() {
    this.getCategories({
      type: this.type,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    //数据展开
    ...userState(["goodkind"]),
  },
};
</script>

<style scoped lang='scss'>
</style>