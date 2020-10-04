import service from "./index"

export default {
    //登录
    login({
        username,
        password
    }) {
        return service.post('/login', {
            username,
            password
        })
    },
    //侧边导航
    getMenus() {
        return service.get('menus')
    },

    //用户数据列表
    getUsers({
        pagenum, //当前页码
        pagesize, //每页显示条数
        query, //查询参数
    }) {
        return service.get(`users?pagenum=${pagenum}&`, {
            pagenum,
            pagesize,
            query
        })
    }

}