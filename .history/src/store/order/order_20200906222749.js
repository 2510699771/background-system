import api from "../../http/api"

export default {
    namespaced: true,
    //存储共享数据
    state: {
        orderList: [],
        total: 0
    },
    mutations: {
        setOrderList(state, data) {
            state.orderList = data
        },
        setTotal(state, data) {
            state.total = data
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
                res.data.goods.map(item=>{
                    if(item.order_pay){
                        
                    }
                })
                commit("setOrderList", res.data.goods)
                commit("setTotal", res.data.total)
            }
        }
    }
}