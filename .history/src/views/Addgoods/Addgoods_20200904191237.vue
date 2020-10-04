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
          <el-step v-for="(item,index) in steps " :key="index" :title="item.title"></el-step>
        </el-steps>
      </div>
    </div>
    <div style="margin-top:30px">
      <el-tabs tab-position="left" style="height: 300px;" v-model="num">
        <el-tab-pane v-for="(item,index) in pane " :key="index" :label="item.label" >
          <el-input v-model="input" placeholder="请输入内容" style="margin-top:10px"></el-input>
          <el-input v-model="input" placeholder="请输入内容" style="margin-top:10px"></el-input>
          <el-input v-model="input" placeholder="请输入内容" style="margin-top:10px"></el-input>
          <el-input v-model="input" placeholder="请输入内容" style="margin-top:10px"></el-input>
          <el-select v-model="value" placeholder="请选择" style="margin-top:20px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
        { label: "基本信息", name: 0 },
        { label: "商品参数", name: 1 },
        { label: "商品属性", name: 2 },
        { label: "商品图片", name: 3 },
        { label: "商品内容", name: 4 },
      ],
      input: "",
      num: 0,
    };
  },
  methods: {
    next() {
      if (this.active++ > 5) this.active = 0;
      this.num++;
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