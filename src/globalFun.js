import Vue from 'vue'
Vue.mixin({
    methods: {
        hasAuth(perm) {
            var authority = this.$store.state.menus.permList 
            //console.log(authority) 
            //console.log(perm)
            //return authority.indexOf(perm) > -1
            return true
        }
    }
})