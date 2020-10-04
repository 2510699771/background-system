import api from "../../http/api"
import router from "../../router"

export default {
    state: {
        //存储共享数据
        reportsList: [] 折线图数据
    },
    //同步修改state的值
    mutations: {
        //折线图方法
        setMenus(state, data) {
            state.menus = data
        },
    },
    //用来发请求，异步提交mutation
    actions: {},
}