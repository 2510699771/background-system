<template>
  <div class="box">
    <div class="bottom">
      <div class="new">欢迎来到xx系统</div>
    </div>
    <div class="center">
      <div class="img">
        <img src="http://img.tukexw.com/img/d98893b85b36dfa4.jpg" alt width="100%" />
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="请输入用户名" prop="username">
          <div class="int">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="请输入密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-form-item label="请输入验证码" prop="code">
            <el-input v-model="ruleForm.code" placeholder="请输入验证"></el-input>
          </el-form-item>
          <div v-html="arr" class="val" @click="getData"></div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registered">立即注册</el-button>
          <el-button type="primary" @click="login">立即登录</el-button>
        </el-form-item>
      </el-form>
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
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.box {
  width: 100vw;
  height: 100vh;
  background-color: rgb(249, 249, 249);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .center {
    width: 308px;
    height: 550px;
    border: 1px solid rgb(224, 222, 222);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .img {
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid rgb(197, 193, 193);
      border-radius: 50%;
      background-color: white;
      box-shadow: rgb(223, 219, 219) 0px 0px 5px 5px;
    }
    .img > img {
      border-radius: 50%;
    }
  }
  .bottom {
    width: 308px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(224, 222, 222);
    .new {
      font-size: 18px;
    }
    .set {
      color: rgb(83, 186, 245);
      font-size: 12px;
    }
  }
}
.val {
  margin-top: 10px;
}
</style>