//import axios from 'axios'
// 查询测试请求
//export const getTest=()=>axios.get('/user/test');

import axios from '../axios'
import qs from 'qs'
export const getTest=query=>{
    console.log('/user/test?'+qs.stringify(query))
    return axios.get('/user/test?'+qs.stringify(query))
}


// import axios from '../axios'
// export const getTest=(query)=>axios.request({
//     url:'/user/test',
//     method: 'get',
//     params: query
// })

// 真实接口商品信息
export const getGoodsData =()=>{
    return axios.get('/sfmyapi/ZSGoods.api')
}

// 真实登录接口登录
export const loginApi=query=>axios.post('/public/login',query)

// 真实接口取数据查询职员信息
// https://www.zhanx.cn/pos/api/employee/list_page2?page=1&limit=12
export const getEmployee=query=>axios.get('/api/employee/list_page2?'+qs.stringify(query))