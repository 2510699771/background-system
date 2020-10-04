import axios from "axios"
import nprogress from "nprogress"

//运行环境：本地环境:devLpment和线上(生产)环境:production
const isPro = process.env.NODE_ENV === 'production'

const servic = axios.create({
    //基础路径
    baseURL: isPro ? '线上接口路径' : '/api',
    timeout: 100000
})
 
//请求拦截
servic.interceptors.request.use((con))





//响应拦截