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
    getUsers(
        query, //查询参数
        pagenum, //当前页码
        pagesize //每页显示条数

    ) {
        return service.get(`users?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //添加用户
    addUser({
        username,
        password,
        email,
        mobile
    }) {
        return service.post('users', {
            username,
            password,
            email,
            mobile
        })
    },
    //删除用户
    delUser(
        id
    ) {
        return service.delete(`users/${id}`)
    },
    //修改用户状态
    state(
        uId, type
    ) {
        return service.put(`users/${uId}/state/${type}`)
    },
    //根据 ID 查询用户信息
    queryUser(
        id
    ) {
        return service.get(`users/${id}`)
    },
    //编辑用户提交
    submitInfo(id,
        email,
        mobile
    ) {
        return service.put(`users/${id}`, {
            email,
            mobile
        })
    },
    //折线图请求
    getReports() {
        return service.get("reports/type/1")
    },
    //角色列表
    getRoles() {
        return service.get("roles")
    },
    //编辑提交角色
    SubmitRole(
        id, roleName, roleDesc
    ) {
        return service.put(`roles/${id}`, {
            roleName,
            roleDesc
        })
    },
    //添加角色
    adRole({
        roleName,
        roleDesc
    }) {
        return service.post("roles", {
            roleName,
            roleDesc
        })
    },
    //删除角色
    delRole(
        id
    ) {
        return service.delete(`roles/${id}`)
    },
    //商品列表
    getGoods(query, pagenum, pagesize) {
        return service.get(`goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //编辑提交商品
    editorGoods(id, goods_name, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs) {
        return service.put(`goods/${id}`, {
            goods_name,
            goods_price,
            goods_number,
            goods_weight,
            goods_introduce,
            pics,
            attrs
        })
    },
    //删除商品
    delGoods(id) {
        return service.delete(`goods/${id}`)
    },
    //获取分类数据
    categories(type, pagenum, pagesize) {
        return service.get(`categories?type=${type}&pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //参数列表`
    getcategories(id, sel) {
        return service.get(`categories/${id}/attributes?sel=${sel}`)
    },
    //添加桑品
    addgoods({
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics,
        attrs
    }) {
        return service.post('goods', {
            goods_name,
            goods_cat,
            goods_price,
            goods_number,
            goods_weight,
            goods_introduce,
            pics,
            attrs
        })
    },
    //编辑提交参数
    putcategories
}