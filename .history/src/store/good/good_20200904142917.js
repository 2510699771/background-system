import api from "../../http/api"
// import {
//     Message
// } from "element-ui"
import dayjs from "dayjs"
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
        //全部数据
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
                res.data.goods.map(item=>{
                    item.add_time = dayjs('2019-01-25').format('[YYYY] YYYY-MM-DDTHH:mm:ssZ[Z]')
                })
                commit("settotal", res.data.total)
                commit("setGoodList", res.data.goods)

            }
        },
    },
}