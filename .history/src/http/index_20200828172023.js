import axios from "axios"
import nprogress from "nprogress"

//运行环境：本地环境和线上(生产)环境
const isPro=process.env.NOOD.ENV
const servic = axios.create({
    //基础路径
    baseURL:'',
    timeout:100000
})