import api from "../../http/api"

export default {
    state: {
        //存储共享数据
        reportsList: [] //折线图数据
    },
    //同步修改state的值
    mutations: {
        //折线图方法
        setMenus(state, data) {
            state.reportsList = data
        },
    },
    actions: {
        //用来发请求，异步提交mutation
        async getReports({
            commit
        }) {
            let res = await api.getReports()
            console.log(res)
            commit("setMenus", res)
        }
    },
}