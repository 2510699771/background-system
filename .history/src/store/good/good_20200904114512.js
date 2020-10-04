import api from "../../http/api"
// import {
//     Message
// } from "element-ui"
export default {
    namespaced: true,
    //存储共享数据
    state: {
        goodList: []
    },
    //同步修改state的值
    mutations: {
        setGoodList(state, data) {
            state.goodList = data
        },
    },

    actions: {
        //提交编辑
        async getGoods({
            dispatch
        }, {
           query, pagenum, pagesize
        }) {
            let res = await api.getGoods(id, roleName, roleDesc)
            if (res.meta.status === 200) {
                console.log(res)
                dispatch("getRoles")

            }
        },
    },
}