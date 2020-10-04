<template>
  <div>
    <myfrom
      :roleList="goodkind"
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
      <!-- <template v-slot:state=></template> -->
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

      //表格的配置项
      columns: [
        {
          label: "分类名称", //表格头
          prop: "cat_name", //绑定单个数据的名字
          align: "center", //表格显示方式
        },
        {
          label: "是否有效",
          prop: "effect",
          align: "center",
          slots: "effect",
        },
        {
          label: "",
          prop: "effect",
          align: "center",
          slots: "effect",
        },
        {
          label: "操作",
          align: "center",
          slots: "state", //2.没有绑定数据名，此为插槽名(用于父组件操作)(参数scope)
        },
      ],
      //表格配置
      indexOptions: {
        label: "#",
        align: "center",
        indexMethod: 1,
        showIndex: true,
      },
      //是否展示分页
      showPaging: true,
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
    ...userState(["goodkind", "kindTotal"]),
  },
};
</script>

<style scoped lang='scss'>
</style>