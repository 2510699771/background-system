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
        async getOrders({comm})
    }
}