import axios from "axios"
import md5 from "blueimp-md5"

// 登录
export function handleLogin(userName,passWord){
 return axios.post("/login",{
   userName:userName,
   passWord:md5(passWord)
 })
}

// 退出登录
export function handleLogout(userName){
  return axios.post("/logout",{
    userName:userName
  })
}

// 注册
export function handleRegister(userName,passWord){
  return axios.post("/register",{
    userName:userName,
    passWord:md5(passWord)
  })
}

// 添加任务
export function addItem(userName,todo){
  return axios.post("/add",{
    userName:userName,
    todo:todo
  })
}

// 删除任务
export function deleteItem(userName,index){
  return axios.post("/delete",{
    userName:userName,
    index:index
  })
}