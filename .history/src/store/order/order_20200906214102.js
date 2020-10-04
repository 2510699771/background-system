import api from "../../http/api"

export default {
    namespaced: true,
    //存储共享数据
    state: {
        orderList: [],
    },
    mutations: {
        setorderList(state, data) {
            state.orderList = data
        },
    }