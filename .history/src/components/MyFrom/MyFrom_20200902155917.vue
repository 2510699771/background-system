<template>
  <el-table :data="permissionsList" v-loading="!tableData.length">
    <template v-for="(item,index) in columns">
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :align="item.align"
        :key="index"
      ></el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  name: "",
  //接受父组件传递的数据
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
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