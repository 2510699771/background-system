<template>
  <div>
    <!-- <myfrom :permissionsList="permissionsList" :columns="columns"></myfrom> -->
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const permissionsModule = createNamespacedHelpers("permissions");
const {
  mapState: permissionsState,
  mapActions: permissionsActions,
} = permissionsModule;
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
        {
          label: "电话",
          prop: "mobile",
          align: "center",
        },
        {
          label: "邮箱",
          prop: "email",
          align: "center",
        },
        {
          label: "状态",
          prop: "mg_state",
          align: "center",
        },
      ],
    };
  },
  methods: {
    //方法展开
    ...permissionsActions(["getRoles"]),
  },
  mounted() {
    this.getRoles();
  },
  watch: {},
  computed: {
    //数据展开
    ...permissionsState(["permissionsList"]),
  },
};
</script>

<style scoped lang='scss'>
</style>