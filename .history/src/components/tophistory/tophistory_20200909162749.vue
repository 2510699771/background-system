<template>
  <div>
    <div style="display:flex">
      <div
        v-for="(item,index) in this.$store.state.list"
        :key="index"
        style="display:flex;margin:20px"
      >
        <!-- v-if="$router.path" -->
        <el-tag v-if="$route.path===item.path" closable @close="handleClose(index)">
          <i class="el-icon-s-opportunity"></i>
          {{item.authName}}
        </el-tag>
        <el-tag type="info" v-else @click="goto(item)">{{item.authName}}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  //接受父组件传递的数据
  props: {},
  //注册组件
  components: {},
  data() {
    return {
      list: [],
    };
  },
  methods: {
    //关闭标签
    handleClose(index) {
      //  this.list.splice(index, 1);
      console.log(this.list);
      //   if (index === this.list.length - 1) {
      //     this.list.splice(index, 1);
      //     this.$router.replace(this.list[index - 1].path);

      //     let name = JSON.parse(localStorage.getItem("admitUser"));
      //     localStorage.setItem(
      //       `${name.username}toplist`,
      //       JSON.stringify(this.list)
      //     );
      //   } else {
      //     this.$router.replace(`${this.list[index + 1].path}`);
      //     this.list.splice(index, 1);
      //     let name = JSON.parse(localStorage.getItem("admitUser"));
      //     localStorage.setItem(
      //       `${name.username}toplist`,
      //       JSON.stringify(this.list)
      //     );
      //   }

      console.log(this.list[index].path);

      // console.log(this.list[index + 1].path);
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
</style>