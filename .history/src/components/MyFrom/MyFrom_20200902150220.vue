<template>
  <el-table></el-table>
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
    columns
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