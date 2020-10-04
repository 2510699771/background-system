import axios from "axios"
import nprogress from "nprogress"
import {
    config
} from "vue/types/umd"

//运行环境：本地环境:devLpment和线上(生产)环境:production
const isPro = process.env.NODE_ENV === 'production'

const servic = axios.create({
    //基础路径
    baseURL: isPro ? '线上接口路径' : '/api',
    timeout: 100000
})

//请求拦截
servic.interceptors.request.use((config) => {
    //请求成功的时候上面的进度条开始
    nprogress.start()
    //前后端建权(令牌)
    let token = localStorage.getItem('adminToken')
    if(token){
        config.headers.Authorization=token
    }
}), err => {
    //请求失败的时候
    nprogress.done()
    return Promise.reject(err)
}


//响应拦截,每一次接口返回路径都会干的事情
servic.interceptors.response.use((res) => {

}), err => {
    //失败的时候
}