import Vue from 'vue'
import Vuex from 'vuex'
import user from "./user/user"
import reports from "./reports/reports"
import permissions from "./permissions/permissions"
import good from "./good/good"
import order from "./order/order"
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  //存储共享数据
  state: {
    list: [{
      name: "首页",
      router: "/home"
    }]
  },
  //同步修改state的值
  mutations: {
    setlist:(state,data){
      state
    }
  },
  //用来发请求，异步提交mutation
  actions: {},
  //模块
  modules: {
    user,
    reports,
    permissions,
    good,
    order
  }
})