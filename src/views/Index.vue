<template>

</template>

<script>

import {getEmployee} from '../api/fetch'
export default {
  name: "Index",
  data(){
    return {}
  },
  methods:{
    async getEmployee(){
      let req={
        page:1,
        limit:20
      }
      console.log(req)
      const res= await getEmployee(req)
      console.log(res.data)
    }
  },
  created(){
    this.getEmployee()
  }
}
</script>

<style scoped>

</style>