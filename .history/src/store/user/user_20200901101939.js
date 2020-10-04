import api from "../../http/api"
import router from "../../router"
import {
    Message
} from "element-ui"
export default {
    //开启命名空间
    namespaced: true,
    //存储共享数据
    state: {
        menus: [], //侧边导航

        userslist: [], //用户管理用户列表

    },
    //同步修改state的值
    mutations: {
        //侧边导航栏方法
        setMenus(state, data) {
            state.menus = data
        },
        //用户管理列表
        setUserslist(state, data) {
            state.userslist = data
        }
    },

    //用来发请求，异步提交mutation
    actions: {
        //所有的请求都写在actions中

        //提交commit
        async getMenus({
            commit
        }) {
            let res = await api.getMenus()
            if (res.meta.status === 200) {
                res.data.unshift({
                    path: 'home',
                    authName: '首页',
                })
                res.data.map(item => {
                    item.path = '/' + item.path
                    router.options.routes.map(item2 => {
                        if (item.path === item2.path) {
                            item.icon = item2.meta.icon
                            if (item2.children && item2.children.length > 0) {
                                item2.children.map(item3 => {
                                    if (item.children && item.children.length > 0) {
                                        item.children.map(item4 => {
                                            if (item4.path === item3.path) {
                                                item4.icon = item3.meta.icon
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
                    if (item.children && item.children.length > 0) {
                        item.children.map(item1 => {
                            item1.path = item.path + '/' + item1.path
                        })
                    }

                })
                commit('setMenus', res.data)

            }
        },

        //没有提交commit
        async login({
            commit
        }, {
            username,
            password
        }) {
            let res = await api.login({
                username,
                password
            })
            if (res.meta.status) {
                localStorage.setItem('admitToken', res.data.token)
                localStorage.setItem('admitUser', JSON.stringify(res.data))
                router.push('/')
                Message.success('登录成功')
                console.log(commit)
            }
        },

        async getUsers({
            commit
        }, {
            query,
            pagenum,
            pagesize,
        }) {
            let res = await api.getUsers(
                query, pagenum, pagesize
            )
            if (res.meta.status === 200) {
                console.log(res, "用户列表")
                commit('setUserslist', res.data.users)
            }
        },
        async addUser({
            commit
        }, {
            username,
            password,
            email,
            mobile
        }) {
            let res = await api.getUsers({
                username,
                password,
                email,
                mobile
            }) if (res.meta.status === 201) {
console.log()
            }
        }

    },
}