<template>
  <el-card class="box-card">
    <el-alert title="注意:只允许为第三级分类设置相关参数!" type="warning" :closable="false" show-icon></el-alert>
    <el-form>
      <el-form-item label="选择商品分类">
        <el-cascader
          v-model="value"
          :options="orieslist"
          @change="mangchose"
          :disabled="cascadershow"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <div>分类参数</div>
  </el-card>
</template>

<script>
export default {
  name: "",
  //接受父组件传递的数据
  props: {},
  //注册组件
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>