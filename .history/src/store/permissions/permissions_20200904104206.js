import api from "../../http/api"
import {
    Message
} from "element-ui"
export default {
    namespaced: true,
    //存储共享数据
    state: {
        roleList: [] //权限数据列表
    },
    //同步修改state的值
    mutations: {
        setPerList(state, data) {
            state.roleList = data
        }
    },

    actions: {
        //用来发请求，异步提交mutation
        async getRoles({
            commit
        }) {
            let res = await api.getRoles()
            if (res.meta.status === 200) {
                res.data.map(item=>{
                    item.level
                })
                console.log(res.data, "roleList")
                commit("setPerList", res.data)
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