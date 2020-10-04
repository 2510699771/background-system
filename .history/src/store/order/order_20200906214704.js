import api from "../../http/api"

export default {
    namespaced: true,
    //存储共享数据
    state: {
        orderList: [],
    },
    mutations: {
        setOrderList(state, data) {
            state.orderList = data
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
          
        }
    }