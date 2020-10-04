import api from "../../http/api"
import {
    Message
} from "element-ui"
export default {
    namespaced: true,
    //存储共享数据
    state: {
        roleList: [], //权限数据列表
        allrole: []
    },
    //同步修改state的值
    mutations: {
        setPerList(state, data) {
            state.roleList = data
        },
        setAllrole(state, data) {
            state.allrole = data
        }
    },

    actions: {
        //用来发请求，异步提交mutation
        async getRoles({
            commit
        }) {
            let res = await api.getRoles()
            if (res.meta.status === 200) {
                commit("setPerList", res.data)
                let list = []
                res.data.map(item => {
                    item.level = "等级一"
                    item.lev = 1
                    item.roleName = item.authName
                    list.push(item)
                    if (item.children.length > 0) {
                        item.children.map(item1 => {
                            item1.level = "等级二"
                            item1.lev = 2
                            item1.roleName = item1.authName
                            if (item1.children.length > 0) {
                                item1.children.map(item2 => {
                                    item2.level = "等级三"
                                    item2.lev = 3
                                    item1.roleName = item.authName
                                    if (item2.children.length > 0) {
                                        item2.children.map(item3 => {
                                            item3.level = "等级四"
                                            item3.lev = 4
                                            list.push(item3)
                                        })
                                    }
                                    list.push(item2)
                                })

                            }
                            list.push(item1)
                        })
                    }
                })
                console.log(list, "roleList")
                commit("setAllrole", list)
            }
        },

        //提交编辑
        async SubmitRole({
            dispatch
        }, {
            id,
            roleName,
            roleDesc
        }) {
            let res = await api.SubmitRole(id, roleName, roleDesc)
            if (res.meta.status === 200) {
                console.log(res)
                dispatch("getRoles")

            }
        },
        async adRole({
            dispatch
        }, {
            roleName,
            roleDesc
        }) {
            let res = await api.adRole({
                roleName,
                roleDesc
            })
            if (res.meta.status === 200) {
                console.log(res)
                dispatch("getRoles")

            }
        },
        async delRole({
            dispatch
        }, {
            id
        }) {
            let res = await api.delRole(id)
            if (res.meta.status === 200) {
                console.log(res)

                Message.success(res.meta.msg)
                dispatch("getRoles")
            } else {
                Message.error(res.meta.msg)
            }
        }
    },
}