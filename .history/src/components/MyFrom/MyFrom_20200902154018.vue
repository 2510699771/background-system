<template>
  <el-table :data="tableData" v-loading="!tableData.length">
    <template v-for="">
      <el-table-column></el-table-column>
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