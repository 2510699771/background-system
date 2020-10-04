<template>
  <div>
    <el-dialog :title="title" :visible.sync="Visible" width="30%" :before-close="handleClose">
      <el-form :model="value" :rules="rules" ref="myform">
        <template v-for="(item,index) in Dialogfrom">
          <el-form-item :label="item.lable" :key="index" v-if="!item.children" :prop="item.prop">
            <!-- 动态渲染组件 -->
            <component :is="`el-${item.type}`" v-bind="item.attrs" v-model="value[item.prop]"></component>
          </el-form-item>

          <el-form-item :label="item.lable" :key="index" v-else>
            <!-- 动态渲染组件 -->
            <component :is="`el-${item.type}`" v-bind="item.attrs" v-model="value[item.prop]">
              <component
                v-for="(ite,ind) in item.children"
                :key="ind"
                :is="`el-${ite.type}`"
                :label="ite.label"
                :value="ite.label"
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
      value: {},
      rules: {},
    };
  },
  methods: {
    //对话框右上角X号
    handleClose() {
      console.log("关闭");
      this.$emit("update:Visible", false);
      this.$refs["myform"].clearValidate();
    },
    //点击取消
    cancel() {
      this.$emit("cancel");
    },
    //点击确定
    confirm() {
      this.$nextTick(()=>{
        console.log(
          this.$refs.myform.model
        );
        // this.$refs.myform.model={}
        this.$emit("confirm", this.value,this.$refs.myform);
      });
      
      // this.$refs["myform"].resetFields();
      // console.log(this.$refs);
    },
    setrules() {
      //不能直接改父组件中的值，通过定义后拷贝拿到然后在子组件中修改
      console.log(this.Dialogfrom, "this.Dialogfrom");
      let value = {};
      let rules = {};
      this.Dialogfrom.map((item) => {
        rules[item.prop] = item.rules;
        value[item.prop] = item.value;
      });
      console.log(value, "value");
      console.log(rules, "rules");
      this.value = JSON.parse(JSON.stringify(value));
      this.rules = JSON.parse(JSON.stringify(rules));
    },
  },
  mounted() {
    this.setrules();
  },
  watch: {
    Dialogfrom: {
      //复杂数据监听
      handler() {
        this.setrules();
      },
      deep: true,
    },
  },
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>