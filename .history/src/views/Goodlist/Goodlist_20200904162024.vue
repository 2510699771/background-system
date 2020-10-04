<template>
  <el-card class="box-card">
    <div>
      <div style="width:30vw;display:flex;margin-bottom: 20px;">
        <el-input
          placeholder="请输入搜索内容"
          v-model="value"
          @change="inputChange"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
        <el-button type="primary" style="margin-left:20px" @click="addgood">添加商品</el-button>
      </div>
      <!-- 表格组件(全) -->
      <myfrom
        :roleList="goodList"
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
        <template v-slot:state="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editor(scope.scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="delGoods(scope.scope.row)"
          ></el-button>
        </template>
      </myfrom>
      <!-- 对话框组件(全) -->
      <mydialog
        :Visible.sync="Visible"
        :Dialogfrom="Dialogfrom1"
        @cancel="cancel"
        @confirm="confirm"
        @Visible="present"
        :title="title"
      ></mydialog>
    </div>
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
      id: "",
      value: "",
       goods_introduce:"",
          pics:{}
      pagesizes: [5, 10, 20, 30],
      pagesize: 10, //每页显示条数
      pagenum: 1, //当前页码
      //是否展示分页
      showPaging: true,
      query: "", //查询参数
      //table配置
      table: {
        //是否创建带斑马纹
        stripe: true,
        //是否需要竖直方向的边框
        border: true,
        //Table 的尺寸medium / small / mini
        //size: "medium",
      },
      //表格配置
      indexOptions: {
        label: "#",
        align: "center",
        indexMethod: 0,
        showIndex: true,
      },
      //表格的配置项
      columns: [
        {
          label: "商品名称", //表格头
          prop: "goods_name", //绑定单个数据的名字
          align: "center", //表格显示方式
          width: "800", //宽度
        },
        {
          label: "商品价格(元)",
          prop: "goods_price",
          align: "center",
        },
        {
          label: "商品重量",
          prop: "goods_weight",
          align: "center",
        },
        {
          label: "创建时间",
          align: "center",
          prop: "add_time",
        },
        {
          label: "操作",
          align: "center",
          slots: "state", //2.没有绑定数据名，此为插槽名(用于父组件操作)(参数scope)
        },
      ],
      //对话框配置内容
      Dialogfrom1: [
        //单个输入框配置项目
        {
          type: "input",
          lable: "商品名称",
          value: "",
          //验证规则
          prop: "goods_name",
          rules: [
            {
              required: true,
              message: "角色名不能为空",
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
          lable: "商品价格",
          prop: "goods_price",
          value: "",
          rules: [
            {
              required: true,
              message: "价格不能为空",
              trigger: "blur",
            },
          ],
          attrs: {
            placeholder: "请输入",
            //清空输入框图标,
            clearable: true,
            "show-password": false,
            "label-width": "120px",
          },
        },
        {
          type: "input",
          lable: "商品数量",
          prop: "goods_number",
          value: "",
          rules: [
            {
              required: true,
              message: "数量不能为空",
              trigger: "blur",
            },
          ],
          attrs: {
            placeholder: "请输入",
            //清空输入框图标
            clearable: true,
            "show-password": false,
            "label-width": "120px",
          },
        },
        {
          type: "input",
          lable: "商品重量",
          prop: "goods_weight",
          value: "",
          rules: [
            {
              required: true,
              message: "重量不能为空",
              trigger: "blur",
            },
          ],
          attrs: {
            placeholder: "请输入",
            //清空输入框图标
            clearable: true,
            "show-password": false,
          },
        },
      ],
      //编辑对话框是否打开
      Visible: false,
      title: "编辑商品",
    };
  },
  methods: {
    //方法展开
    ...userActions(["getGoods", "editorGoods"]),
    handleSizeChange(val) {
      //  console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getGoods({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getGoods({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
    //输入框change事件
    inputChange(e) {
      console.log(e);
      this.query = e;
      if (!e) {
        this.getGoods({
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        });
      }
    },
    //添加商品
    addgood() {},
    //搜索
    search() {
      this.getGoods({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
    //点击编辑打开对话框
    editor(scope) {
      this.id = scope.goods_id;
      this.Dialogfrom1[0].value = scope.goods_name;
      this.Dialogfrom1[1].value = scope.goods_price;
      this.Dialogfrom1[2].value = scope.goods_number;
      this.Dialogfrom1[3].value = scope.goods_weight;
      this.Visible = true;
    },
    //删除商品
    delGoods(scope) {
      console.log(scope);
    },
    //对话框取消
    cancel(val) {
      this.$message("点击了取消");
      this.Visible = false;
      val.myfrom.resetFields();
    },
    //对话框确定
    confirm(val) {
      console.log(val.value);
      val.myfrom.validate((vaild) => {
        if (vaild) {
          //  this.editorGoods({
          // id:this.id,
          //   goods_name:val.value.goods_name,
          //   goods_price:val.value.goods_price,
          //   goods_number:val.value.goods_number,
          //   goods_weight:val.value.goods_weight,
          //   goods_introduce,
          //   pics,
          //   attrs;
          //  })
          this.Visible = false;
          this.$message.success("点击了确定");
          // val.myfrom.resetFields();
        } else {
          this.$message.error("表单填写有误，请检查");
        }
      });
    },
    //子组件分发事件(点旁边空白或右上角X号关闭)
    present() {
      this.Visible = false;
      this.Visible1 = false;
    },
  },
  mounted() {
    this.getGoods({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    //数据展开
    ...userState(["goodList", "total"]),
  },
};
</script>

<style scoped lang='scss'>
</style>