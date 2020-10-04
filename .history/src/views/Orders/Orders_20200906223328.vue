<template>
  <div>
    <!-- 表格组件(全) -->
    <myfrom
      :roleList="orderList"
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
      <template v-slot:tag="scope">
        <el-tag v-if="scope.scope.row.pay==='已付款'">{{scope.scope.row.pay}}</el-tag>
        <el-tag e>{{scope.scope.row.pay}}</el-tag>
      </template>
    </myfrom>
  </div>
</template> 

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("order");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  //接受父组件传递的数据
  props: {},
  //注册组件
  components: {},
  data() {
    return {
      query: "", //查询参数
      pagenum: 1, //当前页码
      pagesize: 10, //每页显示条数
      user_id: "", //用户 ID
      pay_status: "", //支付状态
      is_send: "", //是否发货
      order_fapiao_title: "", //['个人','公司']
      order_fapiao_company: "", //公司名称
      order_fapiao_content: "", //发票内容
      consignee_addr: "", //发货地址
      //表格的配置项
      columns: [
        {
          label: "订单编号", //表格头
          prop: "order_number", //绑定单个数据的名字
          align: "center", //表格显示方式
        },
        {
          label: "订单价格",
          prop: "order_price",
          align: "center",
        },
        {
          label: "是否付款",
          prop: "order_pay",
          align: "center",
          slots: "tag",
        },
        {
          label: "是否发货",
          align: "center",
          prop: "is_send",
        },
        {
          label: "下单时间",
          align: "center",
          prop: "create_time",
        },
        {
          label: "操作",
          align: "center",
          slots: "operation",
        },
      ],
      //表格索引配置
      indexOptions: {
        label: "#",
        align: "center",
        indexMethod: 1,
        showIndex: true,
      },
      table: {
        //是否创建带斑马纹
        stripe: true,
        //是否需要竖直方向的边框
        border: true,
        //Table 的尺寸medium / small / mini
        //size: "medium",
      },
      pagesizes: [5, 10, 20, 30],
      //是否展示分页
      showPaging: true,
    };
  },
  methods: {
    ...userActions(["getOrders"]),
    handleSizeChange() {},
    handleCurrentChange() {},
    add(e) {
      console.log(e.scope.row.order_pay);
    },
  },
  mounted() {
    this.getOrders({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
      user_id: this.user_id,
      pay_status: this.pay_status,
      is_send: this.is_send,
      order_fapiao_title: this.order_fapiao_title,
      order_fapiao_company: this.order_fapiao_company,
      order_fapiao_content: this.order_fapiao_content,
      consignee_addr: this.consignee_addr,
    });
  },
  watch: {},
  computed: {
    //数据展开
    ...userState(["orderList", "total"]),
  },
};
</script>

<style scoped lang='scss'>
</style>