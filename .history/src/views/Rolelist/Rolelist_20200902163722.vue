<template>
  <div>
    <myfrom :roleList="roleList" :columns="columns"></myfrom>
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
          label: "姓名",
          prop: "username",
          align: "center",
          width: "400",
        },
        {
          label: "角色",
          prop: "rolt_name",
          align: "center",
        },
      ],
    };
  },
  methods: {
    //方法展开
    ...userActions(["getRoles"]),
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