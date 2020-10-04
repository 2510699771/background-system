import service from "./index"

export default {
    login({
        username,
        passwod
    }) {
        return service.post('/login', {
            username,
            passname
        })
    }

}