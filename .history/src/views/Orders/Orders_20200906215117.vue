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
      query:"", //查询参数
      pagenum:"", //当前页码
      pagesize:"",//每页显示条数
      user_id:"", //用户 ID
      pay_status:"",//支付状态
      
    };
  },
  methods: {
    ...userActions(["getOrders"]),
  },
  mounted() {
    this.getOrders()
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