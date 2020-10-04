<template>
  <el-table :data="roleList" v-loading="!roleList.length">
    <template v-for="(item,index) in columns">
      <el-table-column
        v-if="item.prop"
        :label="item.label" 
        :prop="item.prop"
        :width="item.width"
        :align="item.align"
        :key="index"
      ></el-table-column>
      tem
    </template>
  </el-table>
</template>

<script>
export default {
  name: "",
  //接受父组件传递的数据
  props: {
    roleList: {
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