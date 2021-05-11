import axios from 'axios'
import Element from 'element-ui'
import router from "./router"

axios.defaults.baseURL = "http://localhost:8080"
const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

request.interceptors.request.use(config=>{
    //config.headers['Authorization'] = localStorage.getItem("token") // 请求头带上token
    config.headers['token'] = localStorage.getItem("token") // 请求头带上token
    // console.log("start...")
    // console.log( config)
    // console.log("end...")
    return config
})

request.interceptors.response.use(response=>{
    let res=response.data
    //console.log("res......")
    if (res.code === 200 || res.error===0 || res.code===0) {
        return response
    } else {
        Element.Message.error(res.msg? res.msg : '系统异常！', {duration: 3 * 1000})
        return Promise.reject(response.data.msg)
    }},
    error=>{
        console.log(error)
        if(error.response.data) {
            error.message = error.response.data.msg
        }
        if(error.response.status === 401) {
            router.push("/login")
        }
        Element.Message.error(error.message, {duration: 3 * 1000})
        return Promise.reject(error)
    })

export default request