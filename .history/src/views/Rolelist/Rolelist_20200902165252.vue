<template>
  <div>
    <myfrom :roleList="roleList" :columns="columns">
      <template v-slot:action="scope">
        <el-button type="danger" size="mini" @click="del(scope)">删除</el-button>
      </template>
    </myfrom>
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
          label: "职位",
          prop: "roleName",
          align: "center",
          width: "400",
        },
        {
          label: "描述",
          prop: "roleDesc",
          align: "center",
          width: "400",
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