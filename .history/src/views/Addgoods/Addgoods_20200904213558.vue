<template>
  <div>
    <div class="topall">
      <div class="topright">
        <el-alert
          title="添加商品信息"
          type="info"
          center
          show-icon
          style="height:30px;margin-bottom:20px"
        ></el-alert>
        <el-steps :active="active" finish-status="success">
          <el-step v-for="(item,index) in steps " :key="index" :title="item.label"></el-step>
        </el-steps>
      </div>
    </div>

    <div style="margin-top:30px">
      <el-tabs tab-position="left" style="height: 300px;" v-model="num">
        <el-tab-pane
          v-for="(item,index) in pane "
          :key="index"
          :label="item.label"
          :name="item.name"
          @
        >
          <div v-if="index===0">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              style="width:80%"
            >
              <div v-for="(item,index) in from" :key="index">
                <el-form-item :label="item.label" :prop="item.name">
                  <el-input
                    v-model="ruleForm[item.name]"
                    :disabled="item.disabled"
                    @input="change"
                    @focus="focus(index)"
                  ></el-input>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-button v-if="btnshow===true" style="margin-top: 12px;" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  //接受父组件传递的数据
  props: {},
  //注册组件
  components: {},
  data() {
    return {
      active: 0,
      steps: [
        { label: "基本信息" },
        { label: "商品参数" },
        { label: "商品属性" },
        { label: "商品图片" },
        { label: "商品内容" },
        { label: "完成" },
      ],
      from: [
        { label: "商品名称", name: "goods_name", disabled: false },
        { label: "商品价格", name: "goods_price", disabled: true },
        { label: "商品重量", name: "goods_number", disabled: true },
        { label: "商品数量", name: "goods_weight", disabled: true },
      ],
      pane: [
        { label: "基本信息", name: "0" },
        { label: "商品参数", name: "1" },
        { label: "商品属性", name: "2" },
        { label: "商品图片", name: "3" },
        { label: "商品内容", name: "4" },
      ],
      ruleForm: {
        goods_name: "", //商品名称
        goods_price: "", //价格
        goods_number: "", //数量
        goods_weight: "", //重量
      },
      rules: {
        goods_name: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "价格不能为空", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "数量不能为空", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "重量不能为空", trigger: "blur" },
        ],
      },
      goods_cat: "", //以为','分割的分类列表
      goods_introduce: "", //介绍
      pics: {}, //上传的图片临时路径（对象）
      attrs: [], //商品的参数（数组）
      num: 0,
      index: 0,
      btnshow: false,
    };
  },
  methods: {
    focus(e) {
      this.index = e;
    },
    change(e) {
      if (e != "" && this.index < 3) {
        this.from[this.index + 1].disabled = false;
        console.log(this.index);
      } else if (e != "" && this.index >= 3) {
        this.btnshow = true;
      }
    },
    next() {
      if (this.active++ > 5) this.active = 0;
      console.log(this.active);

      this.num = String(this.active);
      console.log(this.num, "num");
    },
    chose(val) {
      console.log(val);
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.topall {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .topright {
    width: 92%;
  }
}
</style>