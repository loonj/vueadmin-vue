<!--参考网址 https://shimo.im/docs/pxwyJHgqcWjWkTKX/read-->
<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xl="6" :lg="7">
      <div class="login-form">
        <h2>欢迎来到VueAdmin管理系统</h2>
        <el-image
            style="width: 180px; height: 180px"
            :src="require('@/assets/MarkerHub.jpg')">
        </el-image>
        <p>公众号 MarkerHub</p>
        <p>扫码二维码，回复【VueAdmin】获取登录密码</p>
      </div>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical">
      </el-divider>
    </el-col>
    <el-col :xl="6" :lg="7">
      <el-form label-position="right" :rules="rules" label-width="80px" :model="loginFormData" ref="loginForm">
        <el-form-item label="用户名" prop="username" style="width: 380px;">
          <el-input v-model="loginFormData.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password" style="width: 380px;">
          <el-input type="password" v-model="loginFormData.password"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code" style="width: 380px;">
          <el-input v-model="loginFormData.code" style="width: 172px; float: left;" maxlength="5">
          </el-input>
          <el-image class="captchaImg" :src="captchaImg" @click="getCaptcha">
          </el-image>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm2('loginForm')">提交</el-button>
          <el-button @click="getPass">获取密码</el-button>
           <el-button @click="getGoodsData">测试</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import qs from 'qs'
  import {getTest,getGoodsData,loginApi} from '../api/fetch'
  import md5 from 'js-md5'

  export default {
    name: "Login",
    data(){
      return{
        loginFormData: {
          username: '800013',
          password: '123456',
          code: '11111',
          token: '',
        },
        rules: {
          username: [
              {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
              {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          code: [
              {required: true, message: '请输入验证码', trigger: 'blur'},
              {min: 5, max: 5, message: '验证码为5个字符', trigger: 'blur'}
          ],
        },
        captchaImg: ''
      }
    },
    methods:{
      //真实接口登录请求
       submitForm2(formName){  
        this.$refs[formName].validate(valid=>{
          if(valid){
            let req={
              name:this.loginFormData.username,
              pwd:md5(this.loginFormData.password)
            }
            console.log(req)
            loginApi(req).then(res=>{
              if(res.data.code===0){
                const jwt=res.data.data.session_id
                this.$store.commit("SET_TOKEN", jwt)
                this.$router.push("/index")
              }
            }).catch(err=>{
              this.getCaptcha();
              console.log(res)
              })
            
          }
        })
      },
      submitForm(formName){
        console.log(formName)  // loginForm 字符串
        this.$refs[formName].validate(valid=>{
          if(valid){
            console.log(this.$refs[formName]) // VueComponent 对象
            console.log(this.loginFormData)  // 一个包含 4个参数的对象
            console.log(qs.stringify(this.loginFormData)) // username=admin&password=markerhub&code=11111&token=Ey%5DXI%5DdF%28Dpj%2AhY%23qbvGyHgiv8vpQ9%5Ed
            this.$axios.post('/Mlogin?'+qs.stringify(this.loginFormData)).then(
                res=>{
                  console.log(res.data)
                  //const jwt=res.headers['Authorization']
                  const jwt=res.data.data.token
                  console.log("jwt......")
                  console.log(jwt)
                  // 将jwt存储到应用store中
                  this.$store.commit("SET_TOKEN", jwt)
                  console.log(this.$store.state.token)
                  this.$router.push("/index")
                }
            ).catch(
                err=>{
                  this.getCaptcha();
                  console.log('error submit!!');
                }
            )
          }else {
            this.getCaptcha();
            console.log('error submit!!');
            return false;
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getPass() {
        this.$message("请扫描左边的二维码，回复【VueAdmin】获取登录密码");
      },
      getCaptcha() {
        this.$axios.get('/captcha').then(res => {
          this.loginFormData.token = res.data.data.token
          this.captchaImg = res.data.data.captchaImg
        })
      },
      getTest(){
        //this.$axios.get('/user/test').then(res=>console.log(res.data))
        let query={jin:'jin',lon:'1221'}
        getTest(query).then(res=>console.log(res.data))
      },
      async getGoodsData(e){
        e.preventDefault();
        
      //this.$axios.get('/sfmyapi/ZSGoods.api').then(res=>console.log(res.data))
      //const res= await this.$axios.get('/user/test')
      //console.log(res.data)

      // const ress= await this.$axios.request({
      //   url:'/sfmyapi/ZSGoods.api',
      //   method:'get',
      //   params:''
      // })
      //const ress=await this.$axios.get('/sfmyapi/ZSGoods.api')
      //console.log(ress.data)
      const ress=await getGoodsData()
      console.log(ress.data)
      
       let req = {
         name:"800013",
         pwd:md5("123456")
       };

      console.log(req)
      loginApi(req).then(resp=>console.log(resp.data))
      
      
      }
    },
    created() {
      this.getCaptcha()
      //this.getTest()
    }
  }
</script>

<style scoped>
  .el-col {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
  }
  .el-row {
    height: 100%;
    background-color: #fafafa;
  }
  .el-divider {
    height: 200px;
  }
  .captchaImg {
    float: left;
    margin-left: 8px;
    border-radius: 4px;
  }

</style>