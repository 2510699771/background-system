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
      // {
      //   path: "/goods/index",
      //   name: "goods",
      //   component: () => import("../views/Goods/Goods.vue"),
      //   meta: {
      //     title: '商品首页',
      //     parentpath: "/goods",
      //   }
      // }, {
      //   path: '/goods',
      //   redirect: '/goods/index'
      {
        path: "/users",
        name: "/users",
        component: () => import("../views/UserList/UserList.vue"),
        meta: {
          title: '用户列表',
          parentpath: "/users",
        }
      }, {
        path: 'users',
        redirect: '/users'
      },
      {
        path: "/roles",
        name: "/roles",
        component: () => import("../views/Rolelist/Rolelist.vue"),
        meta: {
          title: '角色列表',
          parentpath: "/roles",
        }
      }, {
        path: 'roles',
        redirect: '/roles'
      },
      {
        path: "/rights",
        name: "rights",
        component: () => import("../views/Permissionslist/Permissionslist.vue"),
        meta: {
          title: '权限列表',
          parentpath: "/rights",
        }
      }, {
        path: 'rights',
        redirect: '/rights'
      }, {
        path: "/goods",
        name: "goods",
        component: () => import("../views/Goodlist/Goodlist.vue"),
        meta: {
          title: '商品列表',
          parentpath: "/goods",
        }
      }, {
        path: 'goods',
        redirect: '/goods'
      },
      {
        path: "/goods",
        name: "goods",
        component: () => import("../views/Goodsparams/Goodsparams.vue"),
        meta: {
          title: '分类参数',
          parentpath: "/goods",
        }
      }, {
        path: 'goods',
        redirect: '/goods'
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