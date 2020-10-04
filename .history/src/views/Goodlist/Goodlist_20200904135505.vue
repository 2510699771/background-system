<template>
  <div>
    <!-- 表格组件(全) -->
    <myfrom
      :roleList="goodList"
      :columns="columns"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :total="total"
      :showPaging="showPaging"
      :indexOptions="indexOptions"
      :table="table"
    >
      <template v-slot:state="scope">
        <el-switch v-model="scope.scope.row.mg_state"></el-switch>
      </template>
      <template v-slot:action></template>
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
      value: "",
      currentPage: 1,
      pagesizes: [5, 15, 20, 30],
      pagesize: 5, //每页显示条数
      pagenum: 1, //当前页码
      //是否展示分页
      showPaging: false,
      query: "", //查询参数
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
      //表格的配置项
      columns: [
        {
          label: "商品名称",
          prop: "goods_name",
          align: "center",
          width: "700",
        },
        {
          label: "商品价格",
          prop: "goods_price",
          align: "center",
        },
        {
          label: "商品重量(元)",
          prop: "goods_weight",
          align: "center",
       
        },
        {
          label: "创建时间",
          align: "center",
          prop: "upd_time",
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
    ...userActions(["getGoods"]),
    handleSizeChange() {},
    handleCurrentChange() {},
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
    ...userState(["goodList", "total"]),
  },
};
</script>

<style scoped lang='scss'>
</style>