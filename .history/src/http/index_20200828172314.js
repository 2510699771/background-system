import axios from "axios"
import nprogress from "nprogress"

//运行环境：本地环境:devLpment和线上(生产)环境:production
const isPro=process.env.NODE_ENV === 'production'

const servic = axios.create({
    //基础路径
    baseURL: isPro ?'x''',
    timeout:100000
})