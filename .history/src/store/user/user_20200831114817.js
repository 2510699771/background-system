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
        menus: []
    },
    //同步修改state的值
    mutations: {
        setMenus(state, data) {
            state.menus = data
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
                    authName: '首页'
                })
                console.log(router.options.routes,"route")
                res.data.map(item => {
                    item.path = '/' + item.path
                    router.options.routes.map(item2 => {
                        if (item.path === item2.path) {
                            item.icon = item2.meta.icon
                        }
                    })
                    if (item.children && item.children.length > 0) {
                        item.children.map(item1 => {
                            item1.path = item.path + '/' + item1.path
                        })
                    }
                })
                console.log(res.data, "res.data")
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
        }
    },
}