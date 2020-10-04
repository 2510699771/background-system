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
    

}