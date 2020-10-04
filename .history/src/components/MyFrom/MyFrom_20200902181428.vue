<template>
  <div>
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
            <template v-else>{{scope.row[item.prop]}}</template>
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
    <div v-if="showPaging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  //接受父组件传递的数据
  props: {
    //表格内容接收数据
    roleList: {
      type: Array,
      required: true,
    },
    //表格的配置项
    columns: {
      type: Array,
      required: true,
    },
    //分页总内容
    total: {
      type: [Array, String],
      default: 0, //默认值
    },
    //是否展示分页
    showPaging:{
      type: Boolean,
      t
    }

  },
  //注册组件
  components: {},
  data() {
    return {};
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>