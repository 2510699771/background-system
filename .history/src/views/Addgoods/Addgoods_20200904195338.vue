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
          @tab-click="chose(val)"
        >
          <div v-if="index===0">
            <el-form>
              <el-form-item>
                <el-input
                  v-model="goods_name"
                  placeholder="请输入内容"
                  label="1231"
                  style="margin-top:10px"
                ></el-input>
              </el-form-item>
              <el-form-item label="123" label-width="200px">
                <el-input v-model="goods_price" placeholder="请输入内容" style="margin-top:10px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="goods_weight" placeholder="请输入内容" style="margin-top:10px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="goods_number" placeholder="请输入内容" style="margin-top:10px"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <!-- <el-select v-model="value" placeholder="请选择" style="margin-top:20px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>-->
        </el-tab-pane>
      </el-tabs>
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
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
      pane: [
        { label: "基本信息", name: "0" },
        { label: "商品参数", name: "1" },
        { label: "商品属性", name: "2" },
        { label: "商品图片", name: "3" },
        { label: "商品内容", name: "4" },
      ],
      from:[
        {table:"商品名称"},{},{},{}
      ]
      goods_name: "", //商品名称
      goods_cat: "", //以为','分割的分类列表
      goods_price: "", //价格
      goods_number: "", //数量
      goods_weight: "", //重量
      goods_introduce: "", //介绍
      pics: {}, //上传的图片临时路径（对象）
      attrs: [], //商品的参数（数组）
      num: 0,
    };
  },
  methods: {
    next() {
      if (this.active++ > 5) this.active = 0;
      console.log(this.active);

      this.num = String(this.active);
      console.log(this.num, "num");
    },
    chose(e) {
      console.log(e);
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