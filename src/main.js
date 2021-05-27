import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
//import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import request from "./axios";
import gobal from "./globalFun"

require("./mock") //引入mock数据，关闭则注释该行
// import mock from './mock' 这么写也可以

Vue.use(Element)
//Vue.prototype.$axios=axios
Vue.prototype.$axios=request
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
