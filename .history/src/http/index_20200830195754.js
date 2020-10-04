import axios from "axios"
import nprogress from "nprogress"
import {
    Message
} from "element-ui"

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
    if (token) {
        config.headers['Authorization'] = token
        console.log(token)
    }
    return config
}), err => {
    //请求失败的时候
    nprogress.done()
    return Promise.reject(err)
}


//响应拦截,每一次接口返回路径都会干的事情
servic.interceptors.response.use((res) => {
    nprogress.done()
    return res.data
}), err => {
    //失败的时候
    if (err.response && err.response.status) {
        //错误请求的状态码
        let status = err.response.status
        if (status === 400) {
            Message.error('参数错误')
        }
        if (status === 401) {
            Message.error('登录过期，请重新登录')
        }
        if (status === 403) {
            Message.error('没有权限')
        }
        if (status === 404) {
            Message.error('接口路径错误')
        }
        if (status === 500) {
            Message.error('服务器出错')
        }
        if (status === 400) {
            Message.error('参数错误')
        }
        if (status === 503) {
            Message.error('服务器在维护')
        }
    }
}
export default servic