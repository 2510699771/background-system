<template>
  <el-card class="box-card">
    <el-alert title="注意:只允许为第三级分类设置相关参数!" type="warning" :closable="false" show-icon></el-alert>
    <el-form style="margin-top:20px">
      <el-form-item label="选择商品分类">
        <el-cascader v-model="value" :options="orieslist" @change="mangchose"></el-cascader>
      </el-form-item>
    </el-form>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="first">
        <el-button type="primary" size="mini" :disabled="addattribute">添加参数</el-button>
        <!-- 表格组件 -->
        <myfrom
          :roleList="parameter"
          :columns="columns"
          :expandOptions="expandOptions"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          :showPaging="showPaging"
          :indexOptions="indexOptions"
          :table="table"
        >
          <template v-slot:operation="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editor(scope)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
          </template>
          <template v-slot:operation="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editor(scope)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
          </template>
        </myfrom>
      </el-tab-pane>

      <el-tab-pane label="静态属性" name="second">
        <el-button type="primary" size="mini" :disabled="addattribute">添加属性</el-button>
      </el-tab-pane>
    </el-tabs>
  </el-card>
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
      id: "", //分类id
      sel: "many", //动态参数
      activeName: "first", //静态参数为首页
      value: [], //多级选择绑定内容
      type: [1, 2],
      pagenum: "",
      pagesize: "",
      addattribute: true, //添加属性
      //表格的配置项
      columns: [
        {
          label: "参数名称", //表格头绑定名字
          prop: "attr_name", //绑定的数据名字
          align: "center",
        },
        {
          label: "操作",
          prop: "operation",
          align: "center",
          slots: "operation",
        },
      ],
      //table配置
      table: {
        //是否创建带斑马纹
        stripe: false,
        //是否需要竖直方向的边框
        border: false,
        //Table 的尺寸medium / small / mini
        size: "medium",
      },
      //表格配置
      indexOptions: {
        label: "#",
        align: "center",
        indexMethod: 0,
        showIndex: true,
      },
      //是否展示分页
      showPaging: false,
      expandOptions: true,
    };
  },
  methods: {
    //方法展开
    ...userActions(["categories", "getcategories", "addgoods"]),
    //层级选择器选择事件
    mangchose(val) {
      if (val) {
        //显示按钮
        this.addattribute = false;
        this.id = this.value[this.value.length - 1];
        //获取动态参数请求
        this.getcategories({
          id: this.id,
          sel: this.sel,
        });
      }
    },
    handleClick() {},
    handleSizeChange() {},
    handleCurrentChange() {},
  },
  mounted() {
    //层级选择数据
    this.categories({
      type: this.type,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    //数据展开
    ...userState(["orieslist", "parameter"]),
  },
};
</script>

<style scoped lang='scss'>
</style>