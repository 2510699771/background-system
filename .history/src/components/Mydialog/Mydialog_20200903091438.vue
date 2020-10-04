<template>
  <div>
    <el-dialog :title="title" :visible.sync="Visible" width="30%" :before-close="handleClose">
      <el-form>
        <template
        <el-form-item :label="item.lable" v-for="(item,index) in Dialogfrom" :key="index">
          <!-- 动态渲染组件 -->
          <component :is="`el-${item.type}`" v-bind="item.attrs" v-model="item.value" :prop="item.prop"></component>
        </el-form-item>

      </el-form>
      <!-- 插槽可替换取消确定按钮改为别的 -->
      <slot name="footer" v-if="$slots.footer"></slot>
      <span slot="footer" v-else>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  //接受父组件传递的数据
  props: {
    //对话框是否打开
    Visible: {
      type: Boolean,
      default: false,
    },
    //提示信息
    title: {
      type: String,
      default: "对话框",
    },
    Dialogfrom: {
      type: Array,
    },
  },
  //注册组件
  components: {},
  data() {
    return {};
  },
  methods: {
    //对话框右上角X号
    handleClose() {
      this.$emit("update:Visible", false);
    },
    //点击取消
    cancel() {
      this.$message("点击了取消");
      this.$emit("cancel");
    },
    //点击确定
    confirm() {
      this.$message.success("点击了确定");
      this.$emit("confirm");
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>