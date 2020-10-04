import api from "../../http/api"

export default {
    namespaced: true,
    //存储共享数据
    state: {
        orderList: [],
        total: 0,
        kuaidi: [], //物流信息
    },
    mutations: {
        setOrderList(state, data) {
            state.orderList = data
        },
        setTotal(state, data) {
            state.total = data
        },
        setKuaidi(state, data) {
            state.kuaidi = data
        },
    },
    actions: {
        async getOrders({
            commit
        }, {
            query,
            pagenum,
            pagesize,
            user_id,
            pay_status,
            is_send,
            order_fapiao_title,
            order_fapiao_company,
            order_fapiao_content,
            consignee_addr
        }) {
            let res = await api.getOrders(
                query,
                pagenum,
                pagesize,
                user_id,
                pay_status,
                is_send,
                order_fapiao_title,
                order_fapiao_company,
                order_fapiao_content,
                consignee_addr)
            if (res.meta.status === 200) {
                console.log(res.data.goods)
                res.data.goods.map(item => {
                    if (item.order_pay === "0") {
                        item.pay = "已付款"
                    } else {
                        item.pay = "未付款"
                    }
                })
                commit("setOrderList", res.data.goods)
                commit("setTotal", res.data.total)
            }
        },
        async getKuaidi({
            commit
        }, {
            id
        }) {
            let res = await api.getKuaidi(id)
            if (res.meta.status === 200) {
                console.log(res.data);
                res.data.map(item => {
                    item.attrs.type = "step"
                    item.attrs.title = item.context
                    item.attrs.description = item.time
                })
                co
                commit("setKuaidi", res.data)
            }
        }
    }
}