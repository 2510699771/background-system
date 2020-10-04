import axios from "axios"
import nprogress from "nprogress"

//yunxunghuanjing
const servic = axios.create({
    //基础路径
    baseURL:'',
    timeout:100000
})