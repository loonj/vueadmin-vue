import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
	state: {

		menuList: [],
		permList: [],

		hasRoute: false,

		editableTabsValue: 'Index',
		editableTabs: [{
			title: '首页',
			name: 'Index'
		}],
	},
	mutations: {
		setMenuList(state, menus) {
			state.menuList = menus
		},
		setPermList(state, perms) {
			state.permList = perms
		},
		changeRouteStatus(state, hasRoute) {
			state.hasRoute = hasRoute
			sessionStorage.setItem("hasRoute", hasRoute)
		},
		addTabs(state,tab){
			console.log(tab)
			let index=state.editableTabs.findIndex(item=>item.name === tab.name)
			if(index===-1){
				 // 添加到tabs中         
				 state.editableTabs.push(tab)
			}
			console.log(state.editableTabs)
			// 当前激活的tab      
			state.editableTabsValue = tab.name
		},
		setActiveTab(state, tabName) {      state.editableTabsValue = tabName   }

	},
	actions: {},

}