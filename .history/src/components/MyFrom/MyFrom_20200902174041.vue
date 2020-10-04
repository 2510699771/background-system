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
      >
        <template slot-scope="scope">
          <slot v-if="item.slots" :name="item.slots" :scope="scope"></slot>
          <template v-else>{{scope.row}}</template>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :align="item.align"
      >
        <template slot-scope="scope">
          <slot name="action" :scope="scope"></slot>
        </template>
      </el-table-column>
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