import api from "../../http/api"
// import {
//     Message
// } from "element-ui"
import dayjs from "dayjs"
import {
    Message
} from "element-ui"
export default {
    namespaced: true,
    //存储共享数据
    state: {
        goodList: [],
        total: 0,
        orieslist: []
    },
    //同步修改state的值
    mutations: {
        setGoodList(state, data) {
            state.goodList = data
        },
        settotal(state, data) {
            state.total = data
        },
        setories(state, data) {
            state.orieslist = data
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
                res.data.goods.map(item => {
                    item.add_time = dayjs(item.add_time).format('YYYY-MM-DD HH:mm:ss')
                })
                console.log(res.data.goods)
                commit("settotal", res.data.total)
                commit("setGoodList", res.data.goods)

            }
        },
        async editorGoods({
            commit
        }, {
            id,
            goods_name,
            goods_price,
            goods_number,
            goods_weight,
            goods_introduce,
            pics,
            attrs
        }) {
            let res = await api.editorGoods(id,
                goods_name,
                goods_price,
                goods_number,
                goods_weight,
                goods_introduce,
                pics,
                attrs)
            if (res.meta.status === 200) {
                console.log(res);
                console.log(commit);
                Message.success(res.meta.msg)
            } else {
                console.log(res);
                Message.error(res.meta.msg)
            }


        },
        async delGoods({
            dispatch,

        }, {
            id,
            query,
            pagenum,
            pagesize
        }) {
            let res = await api.delGoods(id)
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
                dispatch('getGoods', {
                    query,
                    pagenum,
                    pagesize,
                })
            }
        },
        async categories({
            commit
        }, {
            type,
            pagenum,
            pagesize
        }) {
            let res = await api.delGoods(type,
                pagenum,
                pagesize)
            if (res.meta.status === 200) {
commit({})
            }
        }
    },
}