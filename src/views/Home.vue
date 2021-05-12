<template>
  <el-container>
    <el-aside style="width:200px">
      <SideMenu></SideMenu>
    </el-aside>
    <el-container>
      <el-header style="height:55px;">
        <Strong>后台管理系统</Strong>
        <div class="header-avatar block">
          <el-avatar class="el-avatar" size="medium" :src="userInfo.avatar"></el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :underline="false">
                <router-link :to="{name: 'UserCenter'}">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-link href="https://space.bilibili.com/13491144">视频讲解</el-link>
          <el-link href="http://markerhub.com">网站</el-link>
        </div>
      </el-header>
      <el-main>
        <div style="margin: 0 15px; background-color:#239382">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>

  import SideMenu from './inc/SideMenu'

  export default {
    name: 'Home',
    components: {
      SideMenu
    },
    data(){
      return{
        userInfo: {               
          id: '-1',               
          username: 'admin',               
          avatar: 'https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg'}
      }
    },
    methods:{
      getUserInfo(){
        this.userInfo=JSON.parse(sessionStorage.getItem("loginUser"))|| this.userInfo
      },
      logout() {      
         this.$store.commit("CLEAR_TOKEN") 
         this.$router.push("/login")   
      }
    },
    created(){
      this.getUserInfo()
    }
  }
</script>

<style scoped>

	.el-container {
		padding: 0;
		margin: 0;
		height: 100%;
	}
	.header-avatar {
		float: right;
		width: 210px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.el-dropdown-link {
		cursor: pointer;
	}
	.el-header {
		background-color: #17B3A3;
		color: #333;
		text-align: center;
		line-height: 60px;
	}
	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		line-height: 200px;
	}
	.el-main {
		color: #333;
		padding: 0;
	}
	a {
		text-decoration: none;
	}
</style>