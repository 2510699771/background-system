<template>
  <div>
    <el-table :data="roleList" border size="mini " v-loading="!roleList.length">
      <!-- 展示索引条件(需要传入索引的配置对象) -->
      <el-table-column
        type="index"
        :stripe="indexOptions.stripe"
        :label="indexOptions.label"
        :align="indexOptions.align"
        :width="indexOptions.width"
        :index="indexOptions.indexMethod"
        v-if="indexOptions && indexOptions.showIndex"
      ></el-table-column>

      <!-- 展示表头条件(需要传入表头的配置对象) -->
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
    <!-- 分页展示 -->
    <div v-if="showPaging" class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  //接受父组件传递的数据
  props: {
    table:
    indexOptions: {
      type: Object,
    },
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
      type: [Number, String],
      default: 0, //默认值
    },
    //是否展示分页
    showPaging: {
      type: Boolean,
      default: true,
    },
    //第几页
    currentPage: {
      type: [Number, String],
      default: 1,
    },
    //选择每页的数据数量
    pageSizes: {
      type: Array,
      default: () => [5, 10, 20, 30], // ***重点(接受数组要写成返回值形式)***
    },
    //默认每页多少条数据
    pageSize: {
      type: [Number, String],
      default: 5,
    },
  },
  //注册组件
  components: {},
  data() {
    return {};
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.paging {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>