<template>
  <div style="text-align: center;">
    <h2></h2>
    <el-image style="width: 180px; height: 180px" :src="require('@/assets/MarkerHub.jpg')"></el-image>
    <p> 更多项目学习，扫描关注公众号！ </p>
  </div>
</template>

<script>
  import {
    getEmployee
  } from '../api/fetch'
  export default {
    name: "Index",
    data() {
      return {}
    },
    methods: {
      async getEmployee() {
        let req = {
          page: 1,
          limit: 20
        }
        console.log(req)
        const res = await getEmployee(req)
        console.log(res.data)
      }
    },
    created() {
      //this.getEmployee()
    }
  }
</script>

<style scoped>

</style>