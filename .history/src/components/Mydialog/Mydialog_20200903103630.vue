<template>
  <div>
    <el-dialog :title="title" :visible.sync="Visible" width="30%" :before-close="handleClose">
      <el-form :model="from" :rules="rules">
        <template v-for="(item,index) in Dialogfrom">
          <el-form-item :label="item.lable" :key="index" v-if="!item.children" :prop="item.prop">
            <!-- 动态渲染组件 -->
            <component :is="`el-${item.type}`" v-bind="item.attrs" v-model="item.value"></component>
          </el-form-item>

          <el-form-item :label="item.lable" :key="index" :prop="item.prop" v-else>
            <!-- 动态渲染组件 -->
            <component :is="`el-${item.type}`" v-bind="item.attrs" v-model="item.value">
              <component
                v-for="(ite,ind) in item.children"
                :key="ind"
                :is="`el-${ite.type}`"
                :label="ite.label"
                :value="ite.value"
              ></component>
            </component>
          </el-form-item>
        </template>
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
    return {
      from: {},
      rules: {},
    };
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
  mounted() {
    let from = {};
    let rules = {};
    this.Dialogfrom.map((item) => {
      rules[item.prop] = item.rules;
      from[item.prop] = item.value;
    });
    console.log(from, "from");
    console.log(rules, "rules");
    this.from=JSON.parse(JSON.stringify(from))
    this.rules=JSON.parse(JSON.stringify(from))
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>