import api from "../../http/api"

export default {
    namespaced: true,
    //存储共享数据
    state: {
        roleList: [] //权限数据列表
    },
    //同步修改state的值
    mutations: {
        setPerList(state, data) {
            state.roleList = data
        }
    },
    
    actions: {
        //用来发请求，异步提交mutation
        async getRoles({
            commit
        }) {
            let res = await api.getReports()
            console.log(res)
            if (res.meta.status === 200) {
                console.log(res.data)
                commit("setPerList", res.data)
            }
        }
    },
}