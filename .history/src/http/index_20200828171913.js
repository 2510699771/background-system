import axios from "axios"
import nprogress from "nprogress"

//运行环境：本地环境或者
const servic = axios.create({
    //基础路径
    baseURL:'',
    timeout:100000
})