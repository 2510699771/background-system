<template>
  <div class="alltop">
    <div class="topContent">
      <div>欢迎来到xx系统</div>
      <div class="userinfo">
        <div>time</div>
        <div>天气</div>
        <div>用户</div>
        <div style="color:skyblue;cursor:pointer">退出</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  //接受父组件传递的数据
  props: {},
  //注册组件
  components: {},
  data() {
    return {
      tiem: "",
    };
  },
  methods: {},
  mounted() {
    this.time = new Date();
    dayjs(this.time).format(String);
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.alltop {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 18px;
  .topContent {
    width: 97%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .userinfo {
      display: flex;
      width: 20%;
    }
    .userinfo > div {
      height: 50px;
      align-items: center;
      display: flex;
      justify-content: center;
      flex: 1;
      font-size: 15px;
    }
  }
}
</style>
