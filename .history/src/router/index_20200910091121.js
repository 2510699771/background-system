import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from "../views/Layout/Layout.vue"

Vue.use(VueRouter)

const routes = [
  //首页
  {
    path: "/home",
    component: Layout,
    meta: {
      icon: 'el-icon-s-home'
    },
    children: [{
      path: "",
      name: 'Home',
      component: Home,
      meta: {
        title: '首页',
        parentpath: '/home',
        icon: 'el-icon-s-home'
      }
    }, ]
  },
  {
    path: '/',
    redirect: '/home'
  },
  //数据统计
  {
    path: "/reports",
    component: Layout,
    meta: {
      icon: 'el-icon-message'
    },
    children: [{
      path: "reports",
      name: "reports",
      component: () => import("../views/Reports/Reports.vue"),
      meta: {
        title: '数据报表',
        parentpath: "/reports/reports",
        icon: 'el-icon-position'
      }
    }]
  },
  //订单管理
  {
    path: "/orders",
    component: Layout,
    meta: {
      icon: 'el-icon-notebook-2'
    },
    children: [{
      path: "orders",
      name: "orders",
      component: () => import("../views/Orders/Orders.vue"),
      meta: {
        title: '订单列表',
        parentpath: "/orders/orders",
        icon: 'el-icon-folder-add'
      }
    }, ]
  },
  //商品管理
  {
    path: "/goods",
    component: Layout,
    meta: {
      icon: 'el-icon-shopping-bag-1'
    },
    children: [{
        path: "goods",
        name: "goods",
        component: () => import("../views/Goodlist/Goodlist.vue"),
        meta: {
          title: '商品列表',
          parentpath: "/goods/goods",
          icon: 'el-icon-bangzhu'
        }
      },
      {
        path: "params",
        name: "params",
        component: () => import("../views/Goodsparams/Goodsparams.vue"),
        meta: {
          title: '分类参数',
          parentpath: "/goods/params",
          icon: 'el-icon-bell'
        }
      }, {
        path: "categories",
        name: "categories",
        component: () => import("../views/GoodsCategories/GoodsCategories.vue"),
        meta: {
          title: '商品分类',
          parentpath: "/goods/categories",
          icon: 'el-icon-date'
        }
      },
    ]
  },
  //用户管理
  {
    path: "/users",
    component: Layout,
    meta: {
      icon: 'el-icon-user'
    },
    children: [{
      path: "users",
      name: "users",
      component: () => import("../views/UserList/UserList.vue"),
      meta: {
        title: '用户列表',
        parentpath: "/users/users",
        icon: 'el-icon-user'
      }
    }, ]
  },
  //权限管理
  {
    path: "/rights",
    component: Layout,
    meta: {
      icon: 'el-icon-folder'
    },
    children: [{
      path: "roles",
      name: "roles",
      component: () => import("../views/Rolelist/Rolelist.vue"),
      meta: {
        title: '角色列表',
        parentpath: "/rights/roles",
        icon: 'el-icon-setting'
      }
    }, {
      path: "rights",
      name: "rights",
      component: () => import("../views/Permissionslist/Permissionslist.vue"),
      meta: {
        title: '权限列表',
        parentpath: "/rights/rights",
        icon: 'el-icon-c-scale-to-original'
      }
    }, ]
  },
  //添加商品
  {
    path: "/goods",
    component: Layout,
    meta: {
      icon: 'el-icon-folder'
    },
    children: [{
      path: "addGoods",
      name: "addGoods",
      component: () => import("../views/Addgoods/Addgoods.vue"),
      meta: {
        title: '添加商品',
        parentpath: "/goods/goods",
        icon: 'el-icon-bangzhu'
      }
    }, ]
  },
  //登录
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  let user = localStorage.getItem('admitUser')
  if
})
export default router