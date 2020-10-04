import api from "../../http/api"

export default {
    namespaced: true,
    state: {
        //存储共享数据
        reportsList: [], //折线图数据
        xAxis: [],
        legend: [],
        series: [],
    },
    //同步修改state的值
    mutations: {
        //折线图方法
        setReport(state, data) {
            state.reportsList = data
        },
        setxAxis(state, data) {
            state.xAxis = data
        },
        setlegend(state, data) {
            state.legend = data
        },
        setseries(state, data) {
            state.series = data
        },
    },
    actions: {
        //用来发请求，异步提交mutation
        async getReports({
            commit
        }) {
            let res = await api.getReports()
            if (res.meta.status === 200) {
                console.log(res.data, "data")
                console.log(res.data.legend.data, "leg")
                commit("setReport", res.data)
                commit("setxAxis", res.data.xAxis[0].data)
                commit("setlegend", res.data.legend.data)
                commit("setseries", res.data.series)
            }

        }
    },
}