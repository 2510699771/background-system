<template>
  <el-card class="box-card">
    <el-alert title="注意:只允许为第三级分类设置相关参数!" type="warning" :closable="false" show-icon></el-alert>
    <el-form style="margin-top:20px">
      <el-form-item label="选择商品分类">
        <el-cascader v-model="value" :options="orieslist" @change="mangchose"></el-cascader>
      </el-form-item>
    </el-form>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="静态参数" name="second">配置管理</el-tab-pane>
    </el-tabs>
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
      activeName: "first", //jingtancanshouweishouye
      value: [],  //多级选择绑定内容
      type: [1, 2],
      pagenum: "",
      pagesize: "",
      addattribute:false //添加属性
    };
  },
  methods: {
    //方法展开
    ...userActions(["categories", "getcategories", "addgoods"]),
    mangchose(val) {
      console.log(val);
      if(val){

      }
    },
    handleClick() {},
  },
  mounted() {
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
</style>