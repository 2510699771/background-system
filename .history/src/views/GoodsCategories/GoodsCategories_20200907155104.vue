<template>
  <div>
    <!-- <myfrom
      :roleList="goodkind"
      :columns="columns"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :total="kindTotal"
      :pageSize="pagesize"
      :currentPage="pagenum"
      :showPaging="showPaging"
      :indexOptions="indexOptions"
      :table="table"
    >
      <template v-slot:effect="scope">
        <i class="el-icon-check" v-if="scope.scope.row.cat_deleted===false"></i>
        <i class="el-icon-close" v-else></i>
      </template>
      <template v-slot:level="scope">
        <i class="el-icon-check" v-if="scope.scope.row.cat_deleted===false"></i>
        <i class="el-icon-close" v-else></i>
      </template>
      <template v-slot:tree="scope">
        
      </template>
    </myfrom>-->
    <tree-table
      ref="table"
      sum-text="sum"
      index-text="#"
      :data="goodkind"
      :columns="columns"
      :stripe="props.stripe"
      :border="props.border"
      :show-header="props.showHeader"
      :show-summary="props.showSummary"
      :show-row-hover="props.showRowHover"
      :show-index="props.showIndex"
      :tree-type="props.treeType"
      :is-fold="props.isFold"
      :expand-type="props.expandType"
      :selection-type="props.selectionType"
    >
      <template slot="cat_effect" scope="scope">
        <i v-if="scope.row.cat_deleted===false" class="el-icon-success" style="color:skyblue"></i>
        <i v-else class="el-icon-success" style="color:skyblue"></i>
      </template>
      <template slot="level" scope="scope">
        <el-tag :type="scope.row.type" style="width:60px">{{scope.row.level}}</el-tag>
      </template>
      <template slot="likes" scope="scope">
        <el-button type="primary" icon="el-icon-edit" size="mini" editor>编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
      </template>
    </tree-table>
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
      props: {
        stripe: false,
        border: true,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: true,

        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false,
      },
      type: [1, 2, 3], //获取级别的分类
      pagenum: 1, //当前页码值
      pagesize: 10, //每页显示多少条数据
      table: {
        //是否创建带斑马纹
        stripe: false,
        //是否需要竖直方向的边框
        border: true,
        // rowkey: "cat_id",
        // treeprops: { children: "children" },
        // lazy: true,
        //Table 的尺寸medium / small / mini
        //size: "medium",
      },
      //表格的配置项
      columns: [
        {
          label: "分类名称", //表格头
          prop: "cat_name", //绑定单个数据的名字
          align: "center", //表格显示方式
          slots: "tree",
        },
        {
          label: "是否有效",
          prop: "cat_effect",
          align: "center",
          template: "cat_effect",
          type: "template",
        },
        {
          label: "排序",
          prop: "level",
          align: "center",
          type: "template",
          template: "level",
        },
        {
          label: "操作",
          prop: "likes",
          align: "center",
          type: "template",
          template: "likes",
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
    qwe(e) {
      console.log(e);
    },
    itemClick() {},
    //方法展开
    ...userActions(["getCategories"]),
    handleSizeChange() {},
    handleCurrentChange() {},
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
* {
  margin: 0;
  padding: 0;
}
.switch-list {
  margin: 20px 0;
  list-style: none;
  overflow: hidden;
}
.switch-item {
  margin: 20px;
  float: left;
}
</style>