import Vue from 'vue'
import Vuex from 'vuex'
import user from "./user/user"
import reports from "./reports/reports"
import permissions from "./permissions/permissions"
import good from "./good/good"
import order from "./order/order"

Vue.use(Vuex)

export default new Vuex.Store({
  //存储共享数据
  state: {
    list:
  },
  //同步修改state的值
  mutations: {},
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