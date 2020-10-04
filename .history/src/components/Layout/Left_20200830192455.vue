<template>
  <div>
    <el-menu router :default-active="$route.path" unique-opened>
      <!-- 最外层循环el-submenu不能直接在标签内部循环，需要在外部插槽循环然后给内容绑定:key -->
      <template v-for="item in arr">
        <el-submenu :key="item.url" :index="item.url" v-if="item.list && item.list.length > 0">
          <!-- ！！！template标签必须要有slot="title"不然就为内容 -->
          <template slot="title">
            <span>{{item.name}}</span>
          </template>
          <!-- 第二层标题循环用<el-menu-item-group>标签包裹 -->
          <el-menu-item-group>
            <!-- el-menu-item标签 :index绑定路由 可在标签内循环 -->
            <el-menu-item :index="item1.url" v-for="item1 in item.list" :key="item1.url">
              <!-- slot="title"可加可不加 -->
              <span slot="title">{{item1.name}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- v-else 如果item下的list为空的时候取消折叠 -->
        <el-menu-item :index="item.url" :key="item.url" v-else>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const {mapState,map}=userModule
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