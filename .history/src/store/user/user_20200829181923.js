import api from "../../http/api"
import router from "../../router"
export default {
    //开启命名空间
    namespaced: true,
    //存储共享数据
    state: {
        menus: []
    },
    //同步修改state的值
    mutations: {
        setMenus(state, data) {
            state.menus = data
        }
    },
    //用来发请求，异步提交mutation
    actions: {
        //所有的请求都写在actions中
        async getMenus({commit},{username,password}){
            let res =await api.getMenus()
        }
    },
}