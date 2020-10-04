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
          label: "商品价格(元)",
          prop: "goods_price",
          align: "center",
        },
        {
          label: "商品重量",
          prop: "goods_weight",
          align: "center",
        },
        {
          label: "创建时间",
          align: "center",
          prop: "add_time",
        },
        {
          label: "操作",
          align: "center",
          slots: "state", //2.没有绑定数据名，此为插槽名(用于父组件操作)(参数scope)
        },
      ],
    };
  },
  methods: {
    ...userActions(["getOrders"]),
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