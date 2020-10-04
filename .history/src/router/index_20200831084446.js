import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from "../views/Layout/Layout.vue"

Vue.use(VueRouter)

const routes = [{
    path: "",
    component: Layout,
    children: [{
        path: "/home",
        name: 'Home',
        component: Home,
        meta: {
          title: '首页',
          parentpath: '/index'
        }
      },
      {
        path: '/index',
        redirect: '/home'
      },
      {
        path: "/goods/index",
        name: "goods",
        component: () => import("../views/Goods/Goods.vue"),
        meta: {
          title: '商品首页',
          parentpath: "/goods",
        }
      }, {
        path: '/goods',
        redirect: '/goods/index'

      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/Login.vue')
  }
]
const isPro = process.env.NODE_ENV === 'production'

const router = new VueRouter({
  mode: isPro ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

export default router