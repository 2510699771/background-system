<template>
  <div class="top">
    <draggable v-model="list" style="display:flex">
      <div
        v-for="(item,index) in this.list"
        :key="index"
        style="display:flex;margin:20px"
        @contextmenu.stop.prevent="$refs.ctxshow.showMenu($event)"
      >
        <!-- v-if="$router.path" -->
        <el-tag
          v-if="$route.path===item.path"
          closable
          @close="handleClose(index)"
          style="cursor:pointer"
        >
          <i class="el-icon-s-opportunity"></i>
          {{item.authName}}
        </el-tag>

        <el-tag type="info" v-else @click="goto(item)" style="cursor:pointer">{{item.authName}}</el-tag>
      </div>
    </draggable>
    <e-vue-contextmenu ref="ctxshow" id="contextStyle" >
      <div @click="handlerSql">Sql数据操作</div>
      <div @click="hideMenu">打开表</div>
      <div>生成代码</div>
    </e-vue-contextmenu>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "",
  //接受父组件传递的数据
  props: {},
  //注册组件
  components: {
    draggable,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    //关闭标签
    handleClose(index) {
      console.log(this.list.length);
      if (index === 0 && this.list.length === 1) {
        if (this.list[0].authName != "首页") {
          this.$router.push("/");
          this.list = [];
          this.list.push({ authName: "首页", path: "/home" });
          let name = JSON.parse(localStorage.getItem("admitUser"));
          localStorage.setItem(
            `${name.username}toplist`,
            JSON.stringify(this.list)
          );
        }
      } else if (index === this.list.length - 1) {
        this.list.splice(index, 1);
        this.$router.replace(this.list[index - 1].path);

        let name = JSON.parse(localStorage.getItem("admitUser"));
        localStorage.setItem(
          `${name.username}toplist`,
          JSON.stringify(this.list)
        );
      } else {
        this.$router.replace(`${this.list[index + 1].path}`);
        this.list.splice(index, 1);
        let name = JSON.parse(localStorage.getItem("admitUser"));
        localStorage.setItem(
          `${name.username}toplist`,
          JSON.stringify(this.list)
        );
      }
    },
    //点击事件
    goto(item) {
      this.$router.replace(item.path);
    },

    hideMenu() {
      this.$refs.ctxshow.hideMenu(); // 隐藏菜单
    },
    show(data) {
      console.log("菜单显示了");
      console.log(data);
    },
    hide(data) {
      console.log("菜单隐藏了");
      console.log(data);
    },
    handlerSql() {
      // 自定义事件
    },
  },
  mounted() {
    this.$bus.$on("topHistory", (data) => {
      this.list = data;
    });
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
  },
  computed: {},
};
</script>

<style scoped lang='scss'>
.top {
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid rgb(226, 221, 221);
  margin-bottom: 10px;
}
#demo {
  width: 50px;
  height: 50px;
  background: pink;
}
</style>