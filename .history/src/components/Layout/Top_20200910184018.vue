<template>
  <div class="alltop">
    <div class="topContent">
      <div id="1">欢迎来到xx系统</div>
      <div class="userinfo">
        <div class="time">
          <div>{{year}}</div>
          <div>{{prompt}}</div>
          <div style="margin:0 8px">{{specific}}</div>
        </div>
        <div style="width:40%;display:flex;align-items:center;">
          <iframe
            scrolling="no"
            src="https://tianqiapi.com/api.php?style=tz&skin=orange"
            frameborder="0"
            width="100%"
            height="20"
            allowtransparency="true"
            style="display:flex;align-items:center;"
          ></iframe>
          <div style="margin:0 12px">亲爱的{{username}}</div>
          <div style="color:skyblue;cursor:pointer;margin:0 12px" @click="exit">退出</div>
        </div>
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
      year: "",
      specific: "",
      prompt: "",
      username: "",
      steps: [
        {
          target: "#v-step-0", // We're using document.querySelector() under the hood
          header: {
            title: "Get Started",
          },
          content: `Discover <strong>Vue Tour</strong>!`,
        },
        {
          target: ".v-step-1",
          content: "An awesome plugin made with Vue.js!",
        },
        {
          target: '[data-v-step="2"]',
          content:
            "Try it, you'll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.",
          params: {
            placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
      ],
    };
  },
  methods: {
    getTime() {
      let time = dayjs(new Date()).format("YYYY年MM月DD日");
      let hour = dayjs(new Date()).format("HH");
      if (0 <= hour && hour <= 12) {
        this.prompt = "上午";
      } else if (24 > hour && hour > 12) {
        this.prompt = "下午";
      }
      let specific = dayjs(new Date()).format("hh时mm分ss秒");
      this.year = time;
      this.specific = specific;
    },
    //退出登录
    exit() {
      localStorage.removeItem("admitUser");
      this.$router.replace("/login");
    },
  },
  mounted() {
    let name = JSON.parse(localStorage.getItem("admitUser"));
    if (name) {
      this.username = name.username;
    }
    setInterval(() => {
      this.getTime();
    }, 1000);

    this.$tours["myTour"].start();
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.alltop {
  color: rgb(12, 61, 63);
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
      width: 40%;
      justify-content: space-around;
    }
    .userinfo > div {
      height: 50px;
      align-items: center;
      display: flex;
      justify-content: center;
      font-size: 15px;
      white-space: nowrap;
    }
  }
}
.time {
  width: 15vw;
  display: flex;
  align-items: center;
}
</style>
