import service from "./index"
import servic from "./index"

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
    getMenus(){
        return servic.get('menus')
    }

}