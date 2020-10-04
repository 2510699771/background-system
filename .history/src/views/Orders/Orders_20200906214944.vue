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
    return {};
  },
  methods: {
    ...userActions(["getOrders"]),
  },
  mounted() {},
  watch: {},
  computed: {
    //数据展开
    ...userState(["orderList", ]),
  },
};
</script>

<style scoped lang='scss'>
</style>