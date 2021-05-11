const Mock = require('mockjs')

const Random = Mock.Random

let Result = {
    code: 200,
    msg: '操作成功',
    data: null
}

const simulateData = function (){
    let data=[]
    for (let i = 0; i < 10; i++) {
        let item={
            name:Random.cname(),
            date:Random.date(),
            city:Random.city()
        }

        data.push(item)
    }
    Result.data=data
    return Result
}

Mock.mock(RegExp('/user/test'),'get',simulateData)

/**
 * Mock.mock( url, post/get , function(options))；
 * url 表示需要拦截的 URL，
 * post/get 需要拦截的 Ajax 请求类型
 * 用于生成响应数据的函数
 */

// 获取验证码图片base64编码以及一个随机码
Mock.mock(RegExp('/captcha'), 'get', () => {
    Result.data = {
        token: Random.string(32), // 获取一个32位的随机字符串,
        captchaImg: Random.dataImage( "120x40", "11111" ) //生成验证码为11111的base64图片编码
    }
    return Result
})

// 因为mock不认识/login?username=xxx，所以用了正则表达式
Mock.mock(RegExp('/Mlogin*'), 'post', (config) =>
{
    // 这里无法在header添加authorization，直接跳过
    console.log("mock----------------login")
    Result.data = {
        token: Random.string(32), // 获取一个32位的随机字符串,
    }
    return Result
})