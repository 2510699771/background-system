import api from "../../http/api"

export default {
    namespaced: true,
    state: {
        //存储共享数据
        reportsList: [] //折线图数据
    },
    //同步修改state的值
    mutations: {
        //折线图方法
        setReport(state, data) {
            state.reportsList = data
        },
    },
    actions: {
        //用来发请求，异步提交mutation
        async getReports({
            commit
        }) {
            let res = await api.getReports()
            if (res.meta.status===200)
            console.log(res)
            commit("setReport", res)
        }
    },
}