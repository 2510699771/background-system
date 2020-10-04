<template>
  <div>
    <el-button
      type="primary"
      style="margin-bottom:20px;width:80px;height:30px"
      @click="addkind"
    >添加分类</el-button>
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
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="medium"
          @click="editor(scope)"
          style="width:80px;height:30px"
        >编辑</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="medium"
          style="width:80px;height:30px"
          @click="del(scope)"
        >删除</el-button>
      </template>
    </tree-table>
    <!-- 编辑 -->
    <mydialog
      :Visible.sync="Visible"
      :Dialogfrom="Dialogfrom"
      @cancel="cancel"
      @confirm="confirm"
      @Visible="present"
      :title="title"
    ></mydialog>
    <!-- 添加 -->
    <mydialog
      :Visible.sync="Visible1"
      :Dialogfrom="Dialogfrom1"
      @cancel="cancel"
      @confirm="confirm"
      @Visible="present"
      :title="title"
    ></mydialog>
    <el-pagination
      style="margin-top:20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="kindTotal"
    ></el-pagination>
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
      pagesizes: [5, 10, 20, 30],
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
      pagesize: 5, //每页显示多少条数据
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
      Visible: false,
      Dialogfrom: [
        //单个输入框配置项目
        {
          type: "input",
          lable: "分类名称",
          value: "",
          //验证规则
          prop: "cat_name",
          rules: [
            {
              required: true,
              message: "分类不能为空",
              trigger: "blur",
            },
          ],
          //attrs内写输入框的单个配置
          attrs: {
            placeholder: "请输入",
            //清空输入框图标
            clearable: true,
            "label-width": "120px",
          },
        },
      ],
      title: "编辑分类",
      cat_id: 0,
      //添加
      Visible1: false,
      Dialogfrom1: [
        //单个输入框配置项目
        {
          type: "input",
          lable: "分类名称",
          value: "",
          //验证规则
          prop: "cat_name",
          rules: [
            {
              required: true,
              message: "分类不能为空",
              trigger: "blur",
            },
          ],
          //attrs内写输入框的单个配置
          attrs: {
            placeholder: "请输入",
            //清空输入框图标
            clearable: true,
            "label-width": "120px",
          },
        },
         {
          type: "input",
          lable: "分类名称",
          value: "",
          //验证规则
          prop: "cat_name",
          rules: [
            {
              required: true,
              message: "分类不能为空",
              trigger: "blur",
            },
          ],
          //attrs内写输入框的单个配置
          attrs: {
            placeholder: "请输入",
            //清空输入框图标
            clearable: true,
            "label-width": "120px",
          },
        },
      ],
    };
  },
  methods: {
    addkind() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getCategories({
        type: this.type,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getCategories({
        type: this.type,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
    //编辑取消
    cancel() {
      this.Visible = false;
    },
    //编辑确定
    confirm(e) {
      this.putCategories({
        id: this.cat_id,
        cat_name: e.value.cat_name,
        type: this.type,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
      this.Visible = false;
    },
    //空白处关闭
    present() {
      this.Visible = false;
    },
    editor(e) {
      this.cat_id = e.row.cat_id;
      console.log(e.row.cat_id);
      this.Visible = true;
      this.Dialogfrom[0].value = e.row.cat_name;
    },
    //删除分类
    del(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delCategories({
            id: e.row.cat_id,
            type: this.type,
            pagenum: this.pagenum,
            pagesize: this.pagesize,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //方法展开
    ...userActions(["getCategories", "putCategories", "delCategories"]),
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