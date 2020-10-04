<template>
  <div>
    <div class="topall">
      <div class="topright">
        <el-steps :active="active" finish-status="success">
          <el-step v-for="(item,index) in steps " :key="index" :title="item.title"></el-step>
        </el-steps>
      </div>
    </div>
    <div style="margin-top:30px">
      <el-tabs tab-position="left" style="height: 200px;">
        <el-tab-pane v :label="item.label">用户管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
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
        { label: "基本信息" },
        { label: "商品参数" },
        { label: "商品属性" },
        { label: "商品图片" },
        { label: "商品内容" },
      ],
    };
  },
  methods: {
    next() {
      if (this.active++ > 5) this.active = 0;
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