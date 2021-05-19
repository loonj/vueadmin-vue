import Vue from 'vue'
import Vuex from 'vuex'
import menus from './modules/menus'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN:(state,token)=>{
      state.token=token
      localStorage.setItem("token",token)
    },
    CLEAR_TOKEN:(state)=>{
      state.token=''
      localStorage.removeItem("token")
      sessionStorage.removeItem("loginUser")
      sessionStorage.removeItem("hasRoute")
    }
  },
  actions: {
  },
  modules: {
    menus
  }
})
