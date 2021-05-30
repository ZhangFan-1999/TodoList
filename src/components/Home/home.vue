<template>
  <div class="home_wrapper">
    <el-container>
      <el-header>
        <div class="title">Todo.List</div>
        <el-input class="addInput" v-model="value" placeholder="添加新任务"></el-input>
        <span class="addbtn" @click="_add">+ New</span>
        <div class="user" v-if="this.userInfo.data.loginStatus">
          <span class="userName">{{this.userInfo.data.user.userName}}</span>
          <img src="" alt="">
          <span class="logout" @click="_handleLogout">退出</span>
        </div>
        <span class="login" @click="gologin" v-if="!this.userInfo.data.loginStatus">登录</span>
      </el-header>
      <el-main>
        <span class="list_title">任务列表</span>
        <ul class="list" v-if="!this.Todos.length==0&&this.userInfo.data.loginStatus==true">
          <li class="item" 
              v-for="(item,index) of this.Todos" :key="index">
              {{index+1+'#'}} {{item}}
              <span class="delBtn" @click="_del(index)">×</span>
          </li>
        </ul>
        <h1 style="text-align:center;margin-top:90px;color:#ccc;font-weight: lighter" v-if="this.Todos.length==0&&this.userInfo.data.loginStatus">当前任务列表为空,请添加新任务</h1>
        <h1 style="text-align:center;margin-top:90px;color:#ccc;font-weight: lighter" v-if="!this.userInfo.data.loginStatus">请先登录</h1>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {handleLogout,addItem,deleteItem} from "@/api/index"
import {mapGetters,mapActions} from "vuex"
export default {
  data() {
    return {
      value:''
    }
  },
  computed:{
    ...mapGetters([
      "userInfo",
      "Todos"
    ])
  },
  methods: {
    ...mapActions([
      "setCurrentUser"
    ]),
    gologin(){
      this.$router.push("/login")
    },
    // 退出登录
    _handleLogout(){
      handleLogout(this.userInfo.data.user.userName).then((res)=>{
        this.setCurrentUser(res.data)
        this.$message({
          message: "已退出登录",
          type: 'success',
          duration:1000,
          offset:100
        })
      })
    },
    // 添加任务
    _add(){
      if(this.userInfo.data.loginStatus==false){
         this.$message({
          message: "您还没有登录",
          type: 'error',
          duration:1000,
          offset:100
        })
      }else{
        if(this.value.indexOf(" ")==0||this.value==""){
          this.$message({
            message:"含有非法字符",
            type:"error",
            duration:1000,
            offset:100
          })
        }else{
           addItem(this.userInfo.data.user.userName,this.value).then((res)=>{
            if(res.data.code==-1){
            this.$message({
              message: res.data.msg,
              type: 'error',
              duration:1000,
              offset:100
            })
          }else{
            this.setCurrentUser(res.data)
          }
        })
      }
    }
  },
    _del(index){
      deleteItem(this.userInfo.data.user.userName,index).then((res)=>{
        if(res.data.code!==-1){
        this.$message({
            message: res.data.msg,
            type: 'success',
            duration:1000,
            offset:100
          })
          this.setCurrentUser(res.data)
        }else{
          this.$message({
            message: res.data.msg,
            type: 'error',
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
.delBtn{
  float:right;
  font-size: 24px;
  margin-right: 10px;
}
.addbtn{
  font-size: 14px;
  margin-left:5%;
  cursor: pointer;
  line-height: 60px;
  padding: 5px;
  background: #2c974b;
  border-radius: 5px;
}
.addInput{
  width: 300px;
  line-height: 60px;
}
.home_wrapper>>>.el-input__inner{
  background-color:#24292e;
  height: 30px;
  margin-left: 20%;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0px;
}
.home_wrapper>>>.el-input__inner:focus{
  outline: none;
}
.login{
  position: absolute;
  top: 0px;
  line-height: 60px;
  right: 20px;
  cursor: pointer;
  font-size: 14px;
}
.item{
  width: 90%;
  height: 40px;
  border-radius: 10px;
  border-bottom: 1px solid #ccc;
  line-height: 40px;
  margin:10px 0px;
  text-indent: 30px;
  cursor: pointer;
  margin-right: 10px;
}
.item:hover{
  background-color: #ebebeb;
}
.list{
  width: 60%;
  margin-left: 320px;
  height: 80%;
  overflow-y: auto;
  overflow-x: hidden;
}
.list_title{
  margin-left: 20%;
  font-size: 24px;
}
.title{
  display: inline;
  font-size: 22px;
  width: 20%;
  height: 100%;
  line-height: 60px;
  margin-left: 20%;
}
.user{
  display: inline;
  line-height: 60px;
  margin-left: 20%;
}
.userName{
  font-size: 18px;
}
.logout{
  cursor: pointer;
  font-size: 14px;
}
.home_wrapper{
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-weight: lighter;
}
.home_wrapper>>>.el-container{
  width: 100%;
  height: 100%;
}
.home_wrapper>>>.el-header{
  background-color: #24292e;
  height: 60px!important;
  color: #fff;
}
.home_wrapper>>>.el-main{
  overflow-y: hidden;
}
</style>