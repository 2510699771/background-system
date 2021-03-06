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
          parentpath: '/home'
        }
      },
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: "/users/users",
        name: "users",
        component: () => import("../views/UserList/UserList.vue"),
        meta: {
          title: '用户列表',
          parentpath: "users",
        }
      },
      {
        path: "/rights/roles",
        name: "roles",
        component: () => import("../views/Rolelist/Rolelist.vue"),
        meta: {
          title: '角色列表',
          parentpath: "/roles",
        }
      },
      {
        path: "/rights/rights",
        name: "rights",
        component: () => import("../views/Permissionslist/Permissionslist.vue"),
        meta: {
          title: '权限列表',
          parentpath: "/rights",
        }
      }, {
        path: "/goods/goods",
        name: "goods",
        component: () => import("../views/Goodlist/Goodlist.vue"),
        meta: {
          title: '商品列表',
          parentpath: "/goods",
        }
      },
      {
        path: "/goods/params",
        name: "params",
        component: () => import("../views/Goodsparams/Goodsparams.vue"),
        meta: {
          title: '分类参数',
          parentpath: "/params",
        }
      }, {
        path: 'params',
        redirect: '/goods/params'
      }, {
        path: "/goods/categories",
        name: "categories",
        component: () => import("../views/GoodsCategories/GoodsCategories.vue"),
        meta: {
          title: '商品分类',
          parentpath: "/categories",
        }
      }, {
        path: 'categories',
        redirect: '/goods/categories'
      },
      {
        path: "/orders/orders",
        name: "orders",
        component: () => import("../views/Orders/Orders.vue"),
        meta: {
          title: '订单列表',
          parentpath: "/orders",
        }
      }, {
        path: 'orders',
        redirect: '/orders/orders'
      },
      {
        path: "/reports",
        name: "reports",
        component: () => import("../views/Reports/Reports.vue"),
        meta: {
          title: '订单列表',
          parentpath: "/reports",
        }
      }, {
        path: 'reports',
        redirect: '/reports'
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