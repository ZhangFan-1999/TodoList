<template>
<div class="login_wrapper">
  <el-card class="box-card">
    <div class="content">
      <el-form :label-position="labelPosition">
        <el-form-item label="用户名">
          <el-input v-model="userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="passWord" show-password></el-input>
        </el-form-item>
      </el-form>
      <el-button plain @click="_handleLogin">登录</el-button>
      <el-button plain @click="_handleRegister">注册</el-button>
    </div>
  </el-card>
</div>
</template>
<script>
import {mapActions,mapGetters} from "vuex"
import {handleLogin,handleRegister} from "@/api/index"
export default {
  data() {
    return {
      userName:"admin",
      passWord:"123",
      labelPosition:'top'
    }
  },
  methods: {
    ...mapActions([
      "setCurrentUser"
    ]),
    _handleLogin(){
      handleLogin(this.userName,this.passWord).then((res)=>{
        if(res.data.code==0){
          this.setCurrentUser(res.data)
          this.$message({
            message: res.data.msg,
            type: 'success',
            duration:1000,
            offset:100
          })
          this.$router.push("/home")
        }else{
         this.$message({
            message: res.data.msg,
            type: 'error',
            duration:1000,
            offset:100
          })
        }
      })
    },
    _handleRegister(){
      handleRegister(this.userName,this.passWord).then((res)=>{
        this.userInfo=res.data
        if(res.data.code==-1){
          this.$message({
          message: res.data.msg,
          type: 'error',
          duration:1000,
          offset:100
          })
        }else{
         this.$message({
          message: res.data.msg,
          type: 'success',
          duration:1000,
          offset:100
          })
        }
      })
    }
  },
}
</script>
<style scoped>
.login_wrapper>>>.box-card{
  width: 50%;
  margin-top: 90px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.userName{
  width: 100px;
  height: 30px;
  outline: none;
  border: 1px solid #ccc;
  margin: 10px;
  border-radius: 8px;
  font-size: 16px;
}
.passWord{
  width: 100px;
  height: 30px;
  outline: none;
  border: 1px solid #ccc;
  margin: 10px;
  border-radius: 8px;
  font-size: 16px;
}
.login_wrapper{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f6f8fa;
}
.content{
  width: 500px;
  height: 300px;
  margin-top: 10%;
  border-radius:5px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.btn{
  padding: 0px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
}
.title{
  font-size: 16px;
}
</style>