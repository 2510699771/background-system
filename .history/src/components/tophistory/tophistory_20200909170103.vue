<template>
  <div class="top">
    <draggable v-model="list" style="display:flex">
      <div v-for="(item,index) in this.list" :key="index" style="display:flex;margin:20px">
        <!-- v-if="$router.path" -->
        <el-tag v-if="$route.path===item.path" closable @close="handleClose(index)" >
          <i class="el-icon-s-opportunity"></i>
          {{item.authName}}
        </el-tag>
        <el-tag type="info" v-else @click="goto(item)">{{item.authName}}</el-tag>
      </div>
    </draggable>
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
      if (index === 0) {
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
    goto(item) {
      this.$router.replace(item.path);
    },
  },
  mounted() {
    this.$bus.$on("topHistory", (data) => {
      this.list = data;
    });
  },
  watch: {},
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
</style>