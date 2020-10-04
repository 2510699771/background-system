<template>
  <div>订单列表</div>
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
    };
  },
  methods: {
    ...userActions(["getOrders"]),
  },
  mounted() {
    this.getOrders({ query: this.query,pagenum:this.pagenum,pagesize:this.pagesize });
  },
  watch: {},
  computed: {
    //数据展开
    ...userState(["orderList"]),
  },
};
</script>

<style scoped lang='scss'>
</style>