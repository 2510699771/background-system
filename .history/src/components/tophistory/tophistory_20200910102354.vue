<template>
  <div class="top">
    <draggable v-model="list" style="display:flex">
      <div
        v-for="(item,index) in this.list"
        :key="index"
        style="display:flex;margin:20px"
        @contextmenu.prevent="rightClick($event,item)"
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

    <e-vue-contextmenu
      ref="ctxshow"
      id="contextStyle"
      class="menu"
      @ctx-show="show"
      @ctx-hide="hide"
    >
      <ul>
        <li @click="mouseClickDel()">删除</li>
        <li @click="mouseClickOpen()">打开</li>
        <li>复制</li>
      </ul>
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

    rightClick(e, item) {
      //接受div参数
      console.log(e, item, "接受div参数");
      this.$refs.ctxshow.showMenu(e);
    },
    hideMenu() {
      this.$refs.ctxshow.hideMenu(); // 隐藏菜单
    },
    mouseClickDel(data) {
      this.hideMenu();
      console.log("删除");
      console.log(data);
    },
    mouseClickOpen(data) {
      this.hideMenu();
      console.log("打开");
      console.log(data);
    },
    show(data) {
      console.log("显示菜单");
      console.log(data);
    },
    hide(data) {
      console.log("隐藏菜单");
      console.log(data);
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