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
        total: 0, //用户管理总数

        userinfo: [] //根据 ID 查询用户信息

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
        },
        //户管理总数
        setTotal(state, data) {
            state.total = data
        },
        //根据 ID 查询用户信息
        setUserinfo(state, data) {
            state.userinfo = data
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
        //获取用户列表
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
                commit('setUserslist', res.data.users)
                commit('setTotal', res.data.total)
            }
        },
        //添加用户
        async addUser({
            dispatch
        }, {
            username,
            password,
            email,
            mobile,
            query,
            pagenum,
            pagesize,
        }) {
            let res = await api.addUser({
                username,
                password,
                email,
                mobile,
            })
            if (res.meta.status === 201) {
                Message.success(res.meta.msg)
                //调用用户列表接口
                dispatch('getUsers', {
                    query,
                    pagenum,
                    pagesize,
                })
            }
        },
        //删除用户
        async delUser({
            dispatch
        }, {
            id,
            query,
            pagenum,
            pagesize
        }) {
            let res = await api.delUser(id)
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
                //调用用户列表接口
                dispatch('getUsers', {
                    query,
                    pagenum,
                    pagesize,
                })
            }else{
                Message.success(res.meta.msg)
            }
        },
        //修改状态
        async state({
            dispatch
        }, {
            uId,
            type,
            query,
            pagenum,
            pagesize
        }) {
            let res = await api.state(uId, type)
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
                dispatch('getUsers', {
                    query,
                    pagenum,
                    pagesize,
                })
            }
        },
        //修改状态
        async queryUser({
                commit
            },
            id,
        ) {
            let res = await api.queryUser(id)
            if (res.meta.status === 200) {
                console.log(res, "获取的用户信息")
                commit('setUserinfo', res.data)
            }
        },
        //编辑用户提交
        async submitInfo({
            dispatch
        }, {
            id,
            email,
            mobile,
            query,
            pagenum,
            pagesize
        }) {
            let res = await api.submitInfo(id, email, mobile)
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
                dispatch('getUsers', {
                    query,
                    pagenum,
                    pagesize,
                })
            }
        }
    },
}