module.exports={
    configureWebpack:{
        devServer:{
            proxy: {
                '/sfmyapi': {
                    target: 'https://www.zhanx.cn/sfmyapi/',
                    pathRewrite: {'/sfmyapi':''},
                    changeOrigin: true
                },
                '/public': {
                    target: 'https://www.zhanx.cn/pos/public/',
                    pathRewrite: {'/public':''},
                    changeOrigin: true
                },
                '/api': {
                    target: 'https://www.zhanx.cn/pos/api/',
                    pathRewrite: {'/api':''},
                    changeOrigin: true
                }
            }
        }
    }
}