import Vue from 'vue'
import Vuex from 'vuex'
import user from "./user/user"
import reports from "./"

Vue.use(Vuex)

export default new Vuex.Store({
  //存储共享数据
  state: {},
  //同步修改state的值
  mutations: {},
  //用来发请求，异步提交mutation
  actions: {},
  //模块
  modules: {
    user,
    reports
  }
})