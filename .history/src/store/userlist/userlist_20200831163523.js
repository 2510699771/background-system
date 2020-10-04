import api from "../../http/api"
import router from "../../router"
import {
    Message
} from "element-ui"

export default {
    //开启命名空间
    namespaced: true,
    //存储共享数据
    state: {
        userslist: []
    },
    //同步修改state的值
    mutations: {
        setUserslist(state, data) {
            state.userslist = data
        }
    },
    //用来发请求，异步提交mutation
    actions: {
        //所有的请求都写在actions中
    }

}