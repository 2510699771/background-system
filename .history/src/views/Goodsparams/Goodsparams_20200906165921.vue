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
        <el-button type="primary" size="mini" :disabled="addattribute" @click="open">添加参数</el-button>
        <!-- 表格组件 -->
        <myfrom
          :roleList="parameter"
          :columns="columns"
          :expandOptions="expandOptions"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @change-tree="changetree"
          :showPaging="showPaging"
          :indexOptions="indexOptions"
          :table="table"
        >
          <template v-slot:expand>
            <div></div>
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </template>

          <template v-slot:operation="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editor(scope)">编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="delparameter(scope)"
            >删除</el-button>
          </template>
        </myfrom>
      </el-tab-pane>

      <el-tab-pane label="静态属性" name="second">
        <el-button type="primary" size="mini" :disabled="addattribute" @click="open">添加属性</el-button>
        <myfrom
          :roleList="parameter"
          :columns="columns"
          :expandOptions="expandOptions"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @change-tree="changetree"
          :showPaging="showPaging"
          :indexOptions="indexOptions"
          :table="table"
        >
          <template v-slot:expand>
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </template>

          <template v-slot:operation="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editor(scope)">编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="delparameter(scope)"
            >删除</el-button>
          </template>
        </myfrom>
      </el-tab-pane>
    </el-tabs>

    <!-- 对话框组件(全) -->
    <mydialog
      :Visible.sync="Visible"
      :Dialogfrom="Dialogfrom1"
      @cancel="cancel"
      @confirm="confirm"
      @Visible="present"
      :title="title"
    ></mydialog>
    <!-- 对话框组件(全) -->
    <mydialog
      :Visible.sync="Visible1"
      :Dialogfrom="Dialogfrom"
      @cancel="cancel"
      @confirm="addparam"
      @Visible="present"
      :title="title"
    ></mydialog>
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
      //添加
      Dialogfrom: [
        //单个输入框配置项目
        {
          type: "input",
          lable: "添加动态参数",
          value: "",
          //验证规则
          prop: "attr_name",
          rules: [
            {
              required: true,
              message: "参数不能为空",
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
      //编辑
      Dialogfrom1: [
        //单个输入框配置项目
        {
          type: "input",
          lable: "动态参数",
          value: "",
          //验证规则
          prop: "attr_name",
          rules: [
            {
              required: true,
              message: "参数不能为空",
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
      //编辑对话框是否打开
      Visible: false, //编辑
      Visible1: false, //添加参数
      title: "修改动态参数",
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",

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
      expandOptions: true, //插槽类名为expand 可自由搭配
      attrId: "", //属性 ID
      attr_name: "", //新属性的名字
      attr_sel: "", //属性的类型[many或only]
      attr_vals: "", //参数的属性值
    };
  },
  methods: {
    open() {
      this.Visible1 = true;
    },
    //添加参数确定
    addparam(val) {
      this.Visible1 = false;
      this.postcategories({
        id: this.id,
        attr_name: val.value.attr_name,
        attr_sel: this.sel,
        attr_vals: this.attr_vals,
      });
      //获取动态参数请求
      this.getcategories({
        id: this.id,
        sel: this.sel,
      });
    },
    //对话框取消
    cancel(val) {
      this.$message("点击了取消");
      this.Visible = false;
      val.myfrom.resetFields();
      console.log(val);
    },
    //对话框确定
    confirm(val) {
      this.attr_name = val.value.attr_name;
      val.myfrom.validate((vaild) => {
        if (vaild) {
          this.putcategories({
            id: this.id,
            attrId: this.attrId,
            attr_name: this.attr_name,
            attr_sel: this.attr_sel,
            attr_vals: this.attr_vals,
          });
          //获取动态参数请求
          this.getcategories({
            id: this.id,
            sel: this.sel,
          });
          this.Visible = false;
        } else {
          this.$message.error("表单填写有误，请检查");
        }
      });
    },
    present() {
      this.Visible = false;
      this.Visible1 = false;
    },
    //编辑
    editor(e) {
      console.log(e.scope.row);
      this.attrId = e.scope.row.attr_id;
      this.attr_sel = e.scope.row.attr_sel;
      this.Visible = true;
      this.Dialogfrom1[0].value = e.scope.row.attr_name;
    },
    //打开箭头分支
    changetree(e) {
      console.log(e.row.attr_vals);
      this.dynamicTags = e.row.attr_vals;
      console.log(this.dynamicTags);
    },
    //删除属性
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    //点击添加标签按钮
    showInput() {
      console.log("13456");
      this.inputVisible = true;
      //点击后使input框自动获得焦点
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //添加标签
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //方法展开
    ...userActions([
      "categories",
      "getcategories",
      "addgoods",
      "putcategories",
      "delcategories",
      "postcategories",
    ]),
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
    //点击标签页
    handleClick(e) {
      console.log(e.label);
      if (e.label === "静态属性") {
        this.Dialogfrom[0].lable = "添加静态属性";
        this.Dialogfrom1[0].lable = "静态属性";
        this.sel = "only";
        this.title = "修改静态属性";
        //获取静态属性请求
        this.getcategories({
          id: this.id,
          sel: this.sel,
        });
      } else {
        this.Dialogfrom[0].lable = "添加静态属性";
        this.title = "修改动态参数";
        this.Dialogfrom1[0].lable = "动态参数";
        this.sel = "many";
        this.getcategories({
          id: this.id,
          sel: this.sel,
        });
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    //删除
    delparameter(e) {
      console.log(e.scope.row.attr_id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delcategories({
            id: this.id,
            attrid: e.scope.row.attr_id,
          });
          //获取动态参数请求
          this.getcategories({
            id: this.id,
            sel: this.sel,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>