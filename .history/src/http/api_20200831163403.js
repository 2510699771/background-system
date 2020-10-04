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
        pagenum,
        pagesize
    }) {
        return service.get('users', {
            pagenum
        ,})
    }

}