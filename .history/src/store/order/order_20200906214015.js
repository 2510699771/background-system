import api from "../../http/api"

export default {
     namespaced: true,
         //存储共享数据
         state: {
             goodList: [],
             total: 0,
             orieslist: [],
             parameter: [] //参数列表
         },
}