import api from "../../http/api"

export default {
    //存储共享数据
    state: {
        permissionsList: [] //权限数据列表
    },
    //同步修改state的值
    mutations: {
        setPermissionsList(state, data) {
            state.permissionsList = data
        }
    },
    //用来发请求，异步提交mutation
    actions: {
        async getRoles({comimit}){
            let res = await api.getRoles()
            if
        }
    },
}