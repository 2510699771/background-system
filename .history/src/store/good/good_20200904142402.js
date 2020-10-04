import api from "../../http/api"
// import {
//     Message
// } from "element-ui"
import 
export default {
    namespaced: true,
    //存储共享数据
    state: {
        goodList: [],
        total: 0
    },
    //同步修改state的值
    mutations: {
        setGoodList(state, data) {
            state.goodList = data
        },
        settotal(state, data) {
            state.total = data
        },
    },

    actions: {
        //提交编辑
        async getGoods({
            commit
        }, {
            query,
            pagenum,
            pagesize
        }) {
            let res = await api.getGoods(query, pagenum, pagesize)
            if (res.meta.status === 200) {
                console.log(res.data.goods)
                commit("settotal", res.data.total)
                commit("setGoodList", res.data.goods)

            }
        },
    },
}