import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from "../views/Layout/Layout.vue"

Vue.use(VueRouter)

const routes = [{
    path: "",
    component: Layout,
    children: [{
      path: "/index/help",
      name: 'Home',
      component: Home,
      meta: {
        title: '首页',
        parentpath: '/index'
      }
    },
        {
          path: '/index',
          redirect: '/index/help'
        },
  ]
  },

  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router