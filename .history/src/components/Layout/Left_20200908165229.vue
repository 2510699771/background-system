<template>
  <div>
    <el-menu router :default-active="$route.meta.parentpath" unique-opened>
      <!-- 最外层循环el-submenu不能直接在标签内部循环，需要在外部插槽循环然后给内容绑定:key -->
      <template v-for="item in menus">
        <el-submenu
          :key="item.id"
          :index="item.path"
          v-if="item.children && item.children.length > 0"
        >
          <!-- ！！！template标签必须要有slot="title"不然就为内容 -->
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.authName}}</span>
          </template>
          <!-- 第二层标题循环用<el-menu-item-group>标签包裹 -->
          <el-menu-item-group>
            <!-- el-menu-item标签 :index绑定路由 可在标签内循环 -->
            <el-menu-item v-for="item1 in item.children" :index="item1.path" :key="item1.id" >
              <!-- slot="title"可加可不加 -->
              <i :class="item1.icon"></i>
              <span slot="title">{{item1.authName}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- v-else 如果item下的list为空的时候取消折叠 -->
        <el-menu-item :index="item.path" :key="item.id" v-else>
          <i :class="item.icon"></i>
          <span slot="title">{{ item.authName }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;

export default {
  name: "",
  //接受父组件传递的数据
  props: {},
  //注册组件
  components: {},
  data() {
    return {};
  },
  methods: {
    //方法展开
    ...userActions(["getMenus"]),
  },
  mounted() {
    this.getMenus();
  },
  watch: {},
  computed: {
    //数据展开
    ...userState(["menus"]),
  },
};
</script>

<style scoped lang='scss'>
</style>