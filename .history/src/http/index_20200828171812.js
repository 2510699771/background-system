import axios from "axios"
import nprogress from "nprogress"

const servic = axios.create({
    //基础路径
    baseURL:''
    timeout:1000
})