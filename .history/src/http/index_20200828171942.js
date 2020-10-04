import axios from "axios"
import nprogress from "nprogress"

//运行环境：本地环境和线上(生产)环境
const 
const servic = axios.create({
    //基础路径
    baseURL:'',
    timeout:100000
})