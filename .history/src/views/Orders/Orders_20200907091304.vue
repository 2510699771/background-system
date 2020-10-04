<template>
  <div>
    <!-- 表格组件(全) -->
    <myfrom
      :roleList="orderList"
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
      <template v-slot:tag="scope">
        <el-tag v-if="scope.scope.row.pay==='已付款'">{{scope.scope.row.pay}}</el-tag>
        <el-tag v-else type="danger">{{scope.scope.row.pay}}</el-tag>
      </template>
      <template v-slot:operation="scope">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editor(scope)"></el-button>
        <el-button
          type="success"
          icon="el-icon-location-outline"
          size="mini"
          @click="location(scope)"
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
</template> 

<script>
import area from "../../../citydata";
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
    return {
      query: "", //查询参数
      pagenum: 1, //当前页码
      pagesize: 10, //每页显示条数
      user_id: "", //用户 ID
      pay_status: "", //支付状态
      is_send: "", //是否发货
      order_fapiao_title: "", //['个人','公司']
      order_fapiao_company: "", //公司名称
      order_fapiao_content: "", //发票内容
      consignee_addr: "", //发货地址
      //表格的配置项
      columns: [
        {
          label: "订单编号", //表格头
          prop: "order_number", //绑定单个数据的名字
          align: "center", //表格显示方式
        },
        {
          label: "订单价格",
          prop: "order_price",
          align: "center",
        },
        {
          label: "是否付款",
          prop: "order_pay",
          align: "center",
          slots: "tag",
        },
        {
          label: "是否发货",
          align: "center",
          prop: "is_send",
        },
        {
          label: "下单时间",
          align: "center",
          prop: "create_time",
        },
        {
          label: "操作",
          align: "center",
          slots: "operation",
        },
      ],
      //表格索引配置
      indexOptions: {
        label: "#",
        align: "center",
        indexMethod: 1,
        showIndex: true,
      },
      table: {
        //是否创建带斑马纹
        stripe: true,
        //是否需要竖直方向的边框
        border: true,
        //Table 的尺寸medium / small / mini
        //size: "medium",
      },
      pagesizes: [5, 10, 20, 30],
      //是否展示分页
      showPaging: true,
      //编辑对话框是否打开
      Visible: false,
      title: "编辑地址",
      //对话框配置内容
      Dialogfrom1: [
        //单个输入框配置项目
        {
          type: "cascader",
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
            placeholder: "请选择",
            //清空输入框图标
            clearable: true,
            "label-width": "120px",
            options:[]
          },
        },
      ],
    };
  },
  methods: {
    ...userActions(["getOrders"]),
    //每页显示条数
    handleSizeChange(e) {
      this.pagesize = e;
      this.getorder();
    },
    //当前页码
    handleCurrentChange(e) {
      this.pagenum = e;
      this.getorder();
    },
    //打开编辑
    editor() {
      this.Visible = true;
    },
    cancel() {},
    confirm() {},
    present() {},
    //打开查看地址
    location(e) {
      console.log(e);
    },
    //获得总数据
    getorder() {
      this.getOrders({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        user_id: this.user_id,
        pay_status: this.pay_status,
        is_send: this.is_send,
        order_fapiao_title: this.order_fapiao_title,
        order_fapiao_company: this.order_fapiao_company,
        order_fapiao_content: this.order_fapiao_content,
        consignee_addr: this.consignee_addr,
      });
    },
  },
  mounted() {
    this.getorder();
    this.Dialogfrom1[0].
    console.log(area, "area");
  },
  watch: {},
  computed: {
    //数据展开
    ...userState(["orderList", "total"]),
  },
};
</script>

<style scoped lang='scss'>
</style>